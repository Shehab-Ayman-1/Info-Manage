import { auth } from "@clerk/nextjs/server";

import { SupplierInvoices, Transactions } from "@/server/models";
import { mainReasons } from "@/constants/finances";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const products = await SupplierInvoices.aggregate([
            {
                $match: { orgId, type: "purchase", createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$products.name",
                    product: { $first: "$products.name" },
                    count: { $sum: "$products.count" },
                    costs: { $sum: { $multiply: ["$products.count", "$products.price"] } },
                },
            },
        ]);

        const transactions = await Transactions.aggregate([
            {
                $match: { orgId, process: "withdraw" },
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

        return json({ transactions, products });
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
