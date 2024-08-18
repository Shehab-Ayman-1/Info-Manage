import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Bills } from "@/server/models";
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

        const sales = await Bills.aggregate([
            {
                $match: { orgId, createdAt: { $gte: startOfDay, $lte: endOfDay } },
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
                    paid: 1,
                    total: 1,
                    client: "$client.name",
                    pending: { $subtract: ["$total", "$paid"] },
                },
            },
        ]);

        return json(sales);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
