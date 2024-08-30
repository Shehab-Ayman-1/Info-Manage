import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

import { SupplierBills, Products, Suppliers, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { getExpireAt } from "@/utils/expireAt";
import { createSchema } from "./schema";
import { json } from "@/utils/response";

export const POST = async (req: NextRequest) => {
    const session = await mongoose.startSession();

    try {
        await DBConnection();
        session.startTransaction();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);

        const body = await req.json();
        const { supplierId, method, place, paid, products } = createSchema.parse(body);

        // Check If The Products Count Is Exist In The Place
        const promise = await Promise.all(
            products.map(async ({ productId, count }) => {
                const product = await Products.findById(productId).session(session);
                return count > product![place]["count"] && product!.name;
            }),
        );

        const promiseValues = promise.filter((item) => item);
        if (promiseValues.length) {
            await session.abortTransaction();
            return json(`Not Enough ${promiseValues.join(" | ")}`, 400);
        }

        // Create Bill
        const productsTotalCosts = products.reduce((prev, cur) => prev + cur.total, 0);
        const billProducts = products.map(({ productId, total, ...product }) => product);

        const expireAt = await getExpireAt();
        await SupplierBills.create(
            [
                {
                    orgId,
                    supplier: supplierId,
                    barcode: Date.now(),
                    paid,
                    expireAt,
                    type: "restore",
                    state: "restore",
                    products: billProducts,
                    total: productsTotalCosts,
                    createdAt: new Date(),
                },
            ],
            { session },
        );

        // Create New Transaction
        const reason = "Supplier Restore Statement";
        await Transactions.create(
            [{ orgId, reason, method, process: "deposit", creator: user.fullName, price: paid, createdAt: new Date() }],
            { session },
        );

        // Update Products Count In The Place
        const updatePromise = await Promise.all(
            products.map(async ({ productId, count }) => {
                const updated = await Products.updateOne(
                    { _id: productId },
                    { $inc: { [`${place}.count`]: -count } },
                    { session },
                );
                return updated.modifiedCount;
            }),
        );

        if (updatePromise.includes(0)) {
            await session.abortTransaction();
            return json("Something Went Wrong.", 400);
        }

        // Update Client Pending Prices
        await Suppliers.updateOne(
            { orgId, _id: supplierId },
            { $inc: { pending: -(productsTotalCosts - paid) } },
            { session },
        );

        // Response
        await session.commitTransaction();
        return json("The Statement Was Successfully Restored.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
