import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { ClientBills } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const sales = await ClientBills.aggregate([
            {
                $match: { orgId, createdAt: { $gte: startOfDay, $lte: endOfDay } },
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
                    count: { $sum: "$products.count" },
                    unit: { $first: "$products.source.unit" },
                    totalSolds: { $sum: "$total" },
                    profits: {
                        $sum: {
                            $subtract: ["$total", { $multiply: ["$products.count", "$products.purchasePrice"] }],
                        },
                    },
                },
            },
        ]);

        return json(sales);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
