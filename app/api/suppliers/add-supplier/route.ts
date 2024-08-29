import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Suppliers } from "@/server/models";
import { json } from "@/utils/response";
import { createSchema } from "./schema";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const process = searchParams.get("process");

        const body = await req.json();
        const { name, phone, supplierId, productsIds } = createSchema.parse(body);

        if (process === "old") await Suppliers.updateMany({ orgId, _id: supplierId }, { $addToSet: { products: productsIds } });

        if (process === "new") {
            const supplier = await Suppliers.findOne({ orgId, name }).lean();
            if (supplier) return json("This Supplier / Product(s) Are Already Exists", 400);
            await Suppliers.create({ orgId, name, phone, products: productsIds });
        }

        return json("The Supplier Was Successfully Added.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
