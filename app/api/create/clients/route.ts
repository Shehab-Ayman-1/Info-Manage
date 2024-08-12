import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Clients } from "@/server/models";
import { json } from "@/utils/response";
import { createSchema } from "./schema";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const body = await req.json();
        const { name, bronzeTo, silverTo } = createSchema.parse(body);

        const client = await Clients.findOne({ orgId, name });
        if (client) return json("This Client Is Already Exist.", 400);

        await Clients.create({ orgId, name, bronzeTo, silverTo });
        return json("The Client Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
