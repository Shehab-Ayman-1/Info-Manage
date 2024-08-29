import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

import { Products, Suppliers } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { createSchema } from "./schema";

export const POST = async (req: NextRequest) => {
    const session = await mongoose.startSession();
    try {
        await DBConnection();
        session.startTransaction();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const body = await req.json();
        const { supplierId, companyId, products } = createSchema.parse(body);

        // Check If The Products Is Already Exists
        const promise = await Promise.all(
            products.map(async (_product) => {
                const product = await Products.findOne({
                    company: companyId,
                    $or: [{ name: _product.name }, { barcode: _product.barcode }],
                }).session(session);
                return product ? { isExist: false, name: product.name } : { isExist: true, ..._product };
            }),
        );
        const promiseResult = promise.filter((item) => !item?.isExist).map((item) => item.name);
        if (promiseResult.length) {
            await session.abortTransaction();
            return json(`These Products Are Already Exists, ${promiseResult.join(" | ")}`, 400);
        }

        const newProducts = promise
            .filter((item) => item.isExist)
            .map(({ isExist, ...product }) => ({ ...product, company: companyId }));

        const createdProducts = await Products.create(newProducts, { session });

        if (supplierId) {
            const productsIds = createdProducts.map(({ _id }) => _id);
            await Suppliers.updateMany({ orgId, _id: supplierId + 1 }, { $addToSet: { products: productsIds } }, { session });
        }

        await session.commitTransaction();
        return json("The Product Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        await session.abortTransaction();
        return json(errors || error.message, 400);
    } finally {
        session.endSession();
    }
};
