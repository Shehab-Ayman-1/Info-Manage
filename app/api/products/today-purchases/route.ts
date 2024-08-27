import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { SupplierBills } from "@/server/models";
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

        const purchases = await SupplierBills.aggregate([
            {
                $match: { orgId, createdAt: { $gte: startOfDay, $lte: endOfDay } },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$products.name",
                    product: { $first: "$products.name" },
                    unit: { $first: "$products.unit" },
                    count: { $sum: "$products.count" },
                    totalPurchases: { $sum: "$total" },
                },
            },
        ]);

        return json(purchases);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
