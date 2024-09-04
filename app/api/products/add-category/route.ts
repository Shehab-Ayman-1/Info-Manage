import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Categories } from "@/server/models";
import { createSchema } from "./schema";
import { json } from "@/utils/response";
import { getTranslations } from "@/utils/getTranslations";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId, orgSlug } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("products.add-category.post");

        const body = await req.json();
        const { name } = createSchema.parse(body);

        const category = await Categories.findOne({ orgId, name });
        if (category) return json(text("category-exist"), 400);

        await Categories.create({ orgId, orgSlug, name });
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
