import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

import { Products, Suppliers } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { createSchema } from "./schema";
import { getTranslations } from "@/utils/getTranslations";

export const POST = async (req: NextRequest) => {
    const session = await mongoose.startSession();
    try {
        await DBConnection();
        session.startTransaction();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("products.add-product.post");

        const body = await req.json();
        const { supplierId, companyId, products } = createSchema.parse(body);

        // Check If The Products Is Already Exists
        const promise = await Promise.all(
            products.map(async (_product) => {
                const product = await Products.findOne({
                    company: companyId,
                    trash: false,
                    $or: [{ name: _product.name }, { barcode: _product.barcode }],
                });
                return product ? { isExist: false, name: product.name } : { isExist: true, ..._product };
            }),
        );
        const promiseResult = promise.filter((item) => !item?.isExist).map((item) => item.name);
        if (promiseResult.length) {
            await session.abortTransaction();
            return json(`${text("products-exist")}, ${promiseResult.join(" | ")}`, 400);
        }

        const newProducts = promise
            .filter((item) => item.isExist)
            .map(({ isExist, ...product }) => ({ ...product, company: companyId }));

        const createdProducts = await Products.create(newProducts, { session });

        if (supplierId) {
            const productIds = createdProducts.map(({ _id }) => _id);
            await Suppliers.updateMany(
                { orgId, _id: supplierId, trash: false },
                { $addToSet: { products: productIds } },
                { session },
            );
        }

        await session.commitTransaction();
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        await session.abortTransaction();
        return json(errors || error.message, 400);
    } finally {
        session.endSession();
    }
};
