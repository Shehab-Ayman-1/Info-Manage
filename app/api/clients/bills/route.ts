import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { Bills, Clients, Products, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date")!;

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const bills = await Bills.aggregate([
            {
                $match: { orgId, createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                $lookup: { from: "clients", as: "client", localField: "client", foreignField: "_id" },
            },
            {
                $unwind: "$client",
            },
            {
                $project: {
                    _id: 1,
                    client: "$client.name",

                    total: 1,
                    paid: 1,
                    state: 1,
                    discount: 1,

                    pending: { $subtract: ["$total", "$paid"] },
                    created_At: "$createdAt",
                },
            },
            {
                $sort: { created_At: -1 },
            },
        ]);

        return json(bills);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId, orgSlug } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);
        const organization = await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug });

        const { billId } = await req.json();
        if (!billId) return json("Something Went Wrong.", 400);

        const bill = await Bills.findById(billId);
        if (!bill) return json("Something Went Wrong.", 400);

        // Check If The Locker Contain The Bill Amount
        const { lockerCash } = await Transactions.getLockerCash(orgId);
        if (bill.paid > lockerCash) return json("Locker Doen't Exist This Bill Cost.", 400);

        // Return The Bill Products To The Market Usign ProductId
        await Promise.all([
            bill.products.map(async ({ productId, count }) => {
                await Products.updateOne({ productId }, { $inc: { "market.count": count } });
            }),
        ]);

        // Decreament The Client purchases Salary, pendingCosts, And Discounts
        await Clients.updateOne(
            { orgId, _id: bill.client },
            {
                $inc: {
                    purchasesSalary: -bill.total,
                    pendingCosts: -(bill.total - bill.paid),
                    discounts: -bill.discount,
                },
            },
        );
        await Clients.updateLevel({ orgId, clientId: bill.client });

        const refreshAfter = +(organization?.publicMetadata?.refreshClientsPurchases as string)?.split(" ")[0];
        await Clients.updateLastRefreshDate({ orgId, clientId: bill.client, refreshAfter });

        // Delete The Bill
        const deleted = await Bills.deleteOne({ orgId, _id: billId });
        if (!deleted.deletedCount) return json("Something Went Wrong.", 400);

        // Create New Transaction
        await Transactions.create({
            orgId,
            reason: "Canceled Client Bill",
            process: "withdraw",
            method: "cash",
            price: bill.paid,
            creator: user.fullName,
        });

        // Response
        return json("The Product Was Deleted Successfully.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
