import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { ClientInvoices, Transactions } from "@/server/models";
import { json } from "@/utils/response";
import { mainReasons } from "@/constants/finances";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const products = await ClientInvoices.aggregate([
            {
                $match: { orgId, type: "sale", createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: { from: "products", as: "products.source", localField: "products.productId", foreignField: "_id" },
            },
            {
                $unwind: "$products.source",
            },
            {
                $group: {
                    _id: "$products.productId",
                    product: { $first: "$products.source.name" },
                    unit: { $first: "$products.source.unit" },
                    count: { $sum: "$products.count" },
                    costs: {
                        $sum: {
                            $multiply: ["$products.count", "$products.soldPrice"],
                        },
                    },
                    profits: {
                        $sum: {
                            $subtract: [
                                { $multiply: ["$products.count", "$products.soldPrice"] },
                                { $multiply: ["$products.count", "$products.purchasePrice"] },
                            ],
                        },
                    },
                },
            },
        ]);

        const transactions = await Transactions.aggregate([
            {
                $match: { orgId, process: "deposit" },
            },
            {
                $unwind: "$history",
            },
            {
                $match: {
                    "history.reason": { $nin: mainReasons },
                    "history.createdAt": { $gte: startDate, $lte: endDate },
                },
            },
            {
                $project: {
                    _id: 1,
                    method: 1,
                    creator: "$history.creator",
                    reason: "$history.reason",
                    costs: "$history.price",
                },
            },
        ]);

        return json({ products, transactions });
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
