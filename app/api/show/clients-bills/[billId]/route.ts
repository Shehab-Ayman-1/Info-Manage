import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { DBConnection } from "@/server/configs";
import { Bills, Clients, Transactions } from "@/server/models";
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
                $lookup: {
                    from: "clients",
                    localField: "client",
                    foreignField: "_id",
                    as: "client",
                },
            },
            {
                $unwind: "$client",
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: {
                    from: "companies",
                    as: "products.company",
                    localField: "products.companyId",
                    foreignField: "_id",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    paid: { $first: "$paid" },
                    client: {
                        $first: {
                            name: "$client.name",
                            level: "$client.level",
                        },
                    },
                    total: { $first: "$total" },
                    discount: { $first: "$discount" },
                    state: { $first: "$state" },
                    createdAt: { $first: "$createdAt" },
                    products: {
                        $push: {
                            company: { $first: "$products.company.name" },
                            product: "$products.name",
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

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);

        const { amount } = await req.json();
        const { billId } = res.params;

        const bill = await Bills.findById(billId);
        if (!bill) return json("Something Went Wrong", 400);
        if (bill.state === "completed") return json("This Bill Is Already Finished", 400);

        // Update The Bill Salaries
        if (amount > bill.total - bill.paid) return json("The Payment Amount Is Greater Than The Pending Amount.", 400);
        await Bills.updateOne(
            { orgId, _id: billId },
            { $inc: { paid: amount }, state: bill.paid + amount >= bill.total ? "completed" : "pending" },
        );

        // Update The Client Salaries
        await Clients.updateOne({ orgId, _id: bill.client }, { $inc: { pendingCosts: -amount } });

        // Create Transaction
        await Transactions.create({
            orgId,
            price: amount,
            creator: user.fullName,
            reason: "Client Bill Payment",
            method: "cash",
            process: "deposit",
        });

        return json("The Payment Was Successfully Done.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
