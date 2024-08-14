import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { Suppliers } from "@/server/models";

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { supplierId, productsIds } = await req.json();
        if (!supplierId || !productsIds.length) return json("Missing Data.", 400);

        await Suppliers.updateOne({ orgId, _id: supplierId }, { products: productsIds });
        return json("The Supplier Products Was Successfully Updated.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
