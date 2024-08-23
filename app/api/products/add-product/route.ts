import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { Products, Suppliers } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { createSchema } from "./schema";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const body = await req.json();
        const { supplierId, companyId, products } = createSchema.parse(body);

        const promise = await Promise.all(
            products.map(async (product) => {
                const exists = await Products.findOne({ name: product.name, company: companyId });
                return exists ? null : product;
            }),
        );

        const newProducts = promise.filter((item) => item).map((product) => ({ ...product, company: companyId }));
        const createdProducts = await Products.create(newProducts);

        if (supplierId) {
            const productsIds = createdProducts.map(({ _id }) => _id);
            await Suppliers.updateMany({ orgId, _id: supplierId }, { $addToSet: { products: productsIds } });
        }

        return json("The Product Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
