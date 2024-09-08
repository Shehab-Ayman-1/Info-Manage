import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { Suppliers } from "@/server/models";
import { createSchema } from "./schema";
import { json } from "@/utils/response";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("suppliers.add-supplier.post");

        const { searchParams } = new URL(req.url);
        const process = searchParams.get("process");

        const body = await req.json();
        const { name, phone, supplierId, productsIds } = createSchema.parse(body);

        if (process === "old")
            await Suppliers.updateMany({ orgId, _id: supplierId, trash: false }, { $addToSet: { products: productsIds } });

        if (process === "new") {
            const supplier = await Suppliers.findOne({ orgId, name, trash: false }).lean();
            if (supplier) return json(text("already-exist"), 400);
            await Suppliers.create({ orgId, name, phone, products: productsIds });
        }

        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
