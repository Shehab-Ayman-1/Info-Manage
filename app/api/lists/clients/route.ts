import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Clients } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const clients = await Clients.find({ orgId }).select(["_id", "name"]);
        return json(clients);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
