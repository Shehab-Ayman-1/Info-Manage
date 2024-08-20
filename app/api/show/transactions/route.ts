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
        const date = searchParams.get("date")!;

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const transactions = await Transactions.aggregate([
            {
                $match: { orgId, createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                $project: {
                    _id: 1,
                    creator: 1,
                    reason: 1,
                    price: 1,
                    method: 1,
                    process: 1,
                    createdAt: 1,
                },
            },
        ]);

        return json(transactions);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
