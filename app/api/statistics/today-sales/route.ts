import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Bills } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const sales = await Bills.aggregate([
            {
                $match: { orgId },
            },
            {
                $lookup: {
                    from: "clients",
                    as: "client",
                    localField: "client",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$client",
            },
            {
                $project: {
                    _id: 1,
                    client: "$client.name",
                    paid: 1,
                    total: 1,
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
