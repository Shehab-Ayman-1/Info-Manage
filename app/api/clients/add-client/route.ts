import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { Clients } from "@/server/models";
import { createSchema } from "./schema";
import { json } from "@/utils/response";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("clients.add-client.post");

        const body = await req.json();
        const { name, phone, bronzeTo, silverTo } = createSchema.parse(body);

        const client = await Clients.findOne({ orgId, name, trash: false });
        if (client) return json(text("already-exist"), 400);

        await Clients.create({ orgId, name, phone, bronzeTo, silverTo });
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
