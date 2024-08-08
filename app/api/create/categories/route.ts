import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { Categories } from "@/server/models";
import { json } from "@/utils/response";
import { DBConnection } from "@/server/configs";
import { createSchema } from "./schema";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const body = await req.json();
        const { name } = createSchema.parse(body);

        const category = await Categories.findOne({ orgId, name });
        if (category) return json("This Category Is Already Exist.", 400);

        await Categories.create({ orgId, name });
        return json("Category Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
