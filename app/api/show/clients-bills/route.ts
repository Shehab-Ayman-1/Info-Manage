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

        const bills = await Bills.aggregate([
            {
                $match: { orgId },
            },
            {
                $lookup: {
                    from: "clients",
                    as: "client",
                    localField: "client",
                    foreignField: "_id",
                },
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

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);

        const { billId } = await req.json();
        if (!billId) return json("Something Went Wrong.", 400);

        const bill = await Bills.findById(billId);
        if (!bill) return json("Something Went Wrong.", 400);

        // Check If The Locker Contain The Bill Amount
        const lockerCash = await Transactions.getLockerMoney(orgId);
        if (bill.paid > lockerCash.currentAmount) return json("Locker Doen't Exist This Bill Cost.", 400);

        // Return The Bill Products To The Market Usign [ProductName, CompanyId]
        await Promise.all([
            bill.products.map(async ({ companyId, name, count }) => {
                await Products.findOneAndUpdate({ company: companyId, name }, { $inc: { "market.count": count } });
            }),
        ]);

        // Decreament The Client Boughts Salary, pendingCosts, And Discounts
        await Clients.updateOne(
            { orgId, _id: bill.client },
            {
                $inc: {
                    boughtsSalary: -bill.total,
                    pendingCosts: -(bill.total - bill.paid),
                    discounts: -bill.discount,
                },
            },
        );
        await Clients.updateLevel({ orgId, clientId: bill.client });

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
