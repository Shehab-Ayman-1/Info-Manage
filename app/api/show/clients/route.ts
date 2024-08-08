import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Clients } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const clients = await Clients.aggregate([
            { $match: { orgId } },
            {
                $project: {
                    _id: 1,
                    client: "$name",
                    discounts: "$discounts",
                    boughts: "$boughtsSalary",
                    pending: "$pendingCosts",
                    level: "$level",
                },
            },
        ]);

        return json(clients);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
