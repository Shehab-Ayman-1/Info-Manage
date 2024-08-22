import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { Bills, Clients, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

type ResponseType = {
    params: { billId: string };
};

export const GET = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { billId } = res.params;

        const bill = await Bills.aggregate([
            {
                $match: { orgId, _id: new Types.ObjectId(billId) },
            },
            {
                $lookup: { from: "clients", localField: "client", foreignField: "_id", as: "client" },
            },
            {
                $unwind: "$client",
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: { from: "products", localField: "products.productId", foreignField: "_id", as: "products.source" },
            },
            {
                $unwind: "$products.source",
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "products.source.company",
                    foreignField: "_id",
                    as: "products.source.company",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    client: { $first: { name: "$client.name", level: "$client.level" } },
                    paid: { $first: "$paid" },
                    total: { $first: "$total" },
                    state: { $first: "$state" },
                    discount: { $first: "$discount" },
                    createdAt: { $first: "$createdAt" },

                    billProfits: {
                        $sum: {
                            $subtract: [
                                { $multiply: ["$products.count", "$products.soldPrice"] },
                                { $multiply: ["$products.count", "$products.purchasePrice"] },
                            ],
                        },
                    },

                    products: {
                        $push: {
                            company: { $first: "$products.source.company.name" },
                            product: "$products.source.name",
                            count: "$products.count",
                            price: "$products.soldPrice",
                            total: { $multiply: ["$products.count", "$products.soldPrice"] },
                        },
                    },
                },
            },
        ]);

        return json(bill);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const PUT = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId, orgSlug } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);
        const organization = await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug });

        const { amount } = await req.json();
        const { billId } = res.params;

        const bill = await Bills.findById(billId);
        if (!bill) return json("Something Went Wrong", 400);
        if (bill.state === "completed") return json("This Bill Is Already Finished", 400);

        // Update The Bill Salaries
        if (amount > bill.total - bill.paid) return json("The Payment Amount Is Greater Than The Pending Amount.", 400);
        const state = bill.paid + amount >= bill.total ? "completed" : "pending";
        await Bills.updateOne({ orgId, _id: billId }, { $inc: { paid: amount }, state });

        // Update The Client Salaries
        await Clients.updateOne({ orgId, _id: bill.client }, { $inc: { pendingCosts: -amount } });

        const refreshAfter = +(organization?.publicMetadata?.refreshClientsPurchases as string)?.split(" ")[0];
        await Clients.updateLastRefreshDate({ orgId, clientId: bill.client, refreshAfter });

        // Create Transaction
        const reason = "Client Bill Payment";
        await Transactions.create({ orgId, reason, price: amount, creator: user.fullName, method: "cash", process: "deposit" });

        return json("The Payment Was Successfully Done.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
