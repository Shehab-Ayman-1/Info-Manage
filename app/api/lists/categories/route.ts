import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Categories } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const categories = await Categories.find({ orgId }).select(["_id", "name"]);
        return json(categories);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
