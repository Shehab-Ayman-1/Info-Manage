import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { Suppliers } from "@/server/models";
import { json } from "@/utils/response";

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("suppliers.show-suppliers.put");

        const { supplierId, productsIds } = await req.json();
        if (!supplierId || !productsIds.length) return json(text("missing-data"), 400);

        await Suppliers.updateOne({ orgId, _id: supplierId }, { products: productsIds });
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
