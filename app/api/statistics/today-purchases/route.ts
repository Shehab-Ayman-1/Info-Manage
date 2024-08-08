import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Debts } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const purchses = await Debts.aggregate([
            {
                $match: { orgId },
            },
            {
                $lookup: {
                    from: "suppliers",
                    as: "supplier",
                    localField: "supplier",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$supplier",
            },
            {
                $project: {
                    _id: 1,
                    supplier: "$supplier.name",
                    paid: 1,
                    total: 1,
                    pending: { $subtract: ["$total", "$paid"] },
                },
            },
        ]);

        return json(purchses);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
