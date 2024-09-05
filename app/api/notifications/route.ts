import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Transactions } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const notifies = await Transactions.aggregate([
            {
                $match: { orgId },
            },
            {
                $unwind: "$history",
            },
            {
                $sort: { "history.createdAt": -1 },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    _id: 1,
                    process: 1,
                    method: 1,
                    createdAt: "$history.createdAt",
                    reason: "$history.reason",
                    price: "$history.price",
                },
            },
        ]);

        return json(notifies);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
