import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Transactions } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return;

        const notifications = await Transactions.find({ orgId })
            .limit(5)
            .sort({ createdAt: -1 })
            .select(["-creator", "-orgId", "-__v"]);
        return json(notifications);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
