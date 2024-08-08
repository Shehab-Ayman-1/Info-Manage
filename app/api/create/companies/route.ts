import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Companies } from "@/server/models";
import { json } from "@/utils/response";
import { createSchema } from "./schema";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const body = await req.json();
        const { image, name, categoryId } = createSchema.parse(body);

        const company = await Companies.findOne({ name, category: categoryId });
        if (company) return json("This Company Is Already Exist", 400);

        await Companies.create({ category: categoryId, name, image });
        return json("Company Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
