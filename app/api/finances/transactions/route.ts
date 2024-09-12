import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Transactions } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const from = searchParams.get("startDate")!;
        const to = searchParams.get("endDate")!;

        const startDate = new Date(from);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(to);
        endDate.setHours(23, 59, 59, 999);

        const transactions = await Transactions.aggregate([
            {
                $match: { orgId, "history.createdAt": { $gte: startDate, $lte: endDate } },
            },
            {
                $unwind: "$history",
            },

            {
                $project: {
                    _id: 1,
                    method: 1,
                    process: 1,
                    creator: "$history.creator",
                    reason: "$history.reason",
                    price: "$history.price",
                    createdAt: "$history.createdAt",
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
        ]);

        return json(transactions);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
