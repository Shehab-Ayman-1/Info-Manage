import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { Companies } from "@/server/models";
import { createSchema } from "./schema";
import { json } from "@/utils/response";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("products.add-company.post");

        const body = await req.json();
        const { image, name, categoryId } = createSchema.parse(body);

        const company = await Companies.findOne({ name, category: categoryId });
        if (company) return json(text("company-exist"), 400);

        await Companies.create({ category: categoryId, name, image });
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
