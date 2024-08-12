import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Products, Transactions } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const amount = await Transactions.getLockerMoney(orgId);

        const places = await Products.aggregate([
            {
                $lookup: {
                    from: "companies",
                    localField: "company",
                    foreignField: "_id",
                    as: "company",
                },
            },
            {
                $unwind: "$company",
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "company.category",
                    foreignField: "_id",
                    as: "company.category",
                },
            },
            {
                $unwind: "$company.category",
            },
            {
                $match: { "company.category.orgId": orgId },
            },
            {
                $project: {
                    _id: 0,
                    market: {
                        $sum: { $multiply: ["$market.count", "$store.price"] },
                    },
                    store: {
                        $sum: { $multiply: ["$store.count", "$store.price"] },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    marketAmount: { $sum: "$market" },
                    storeAmount: { $sum: "$store" },
                },
            },
            {
                $project: {
                    _id: 0,
                    market: "$marketAmount",
                    store: "$storeAmount",
                },
            },
        ]);

        return json([{ locker: amount.currentAmount, market: places?.[0]?.market || 0, store: places?.[0]?.store || 0 }]);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
