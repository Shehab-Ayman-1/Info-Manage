import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

import { ClientBills, Clients, Products, Transactions } from "@/server/models";
import { getTranslations } from "@/utils/getTranslations";
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
        const text = await getTranslations("clients.restore-statement.post");

        const body = await req.json();
        const { billBarcode, products } = createSchema.parse(body);

        const bill = await ClientBills.findOne({ orgId, type: "sale", barcode: billBarcode }).session(session);
        if (!bill) {
            await session.abortTransaction();
            return json(text("missing-bill"), 400);
        }

        const productsTotalCosts = products.reduce((prev, cur) => prev + cur.total, 0);
        const billProducts = products.map(({ total, ...product }) => product);

        // Check If The Products Count Is Exist In The Bill Products
        const isUnableProducts = products.some(({ productId, count }) => {
            const product = bill.products.find((product) => productId === String(product.productId));
            return count > (product?.count || 0);
        });

        if (isUnableProducts) {
            await session.abortTransaction();
            return json(text("products-not-exist"), 400);
        }

        // Check If The Locker Contain Restored Products Salary
        const { lockerCash } = await Transactions.getLockerCash(orgId);
        if (productsTotalCosts > lockerCash) {
            await session.abortTransaction();
            return json(text("locker-not-enough"), 400);
        }

        // Return The Products To The Market
        const promise = await Promise.all(
            products.map(async ({ productId, count }) => {
                const updated = await Products.updateOne({ _id: productId }, { $inc: { "market.count": count } }, { session });
                return updated.modifiedCount;
            }),
        );

        if (promise.includes(0)) {
            await session.abortTransaction();
            return json("wrong", 400);
        }

        // Create Client Bill
        const expireAt = await getExpireAt();
        await ClientBills.create(
            [
                {
                    orgId,
                    client: bill.client,
                    barcode: billBarcode,
                    paid: productsTotalCosts,
                    total: productsTotalCosts,
                    products: billProducts,
                    discount: 0,
                    type: "restore",
                    state: "restore",
                    createdAt: new Date(),
                    expireAt,
                },
            ],
            { session },
        );

        // Create New Transaction
        await Transactions.updateOne(
            {
                orgId,
                method: "cash",
                process: "withdraw",
            },
            {
                $inc: { total: productsTotalCosts },
                $push: {
                    history: {
                        $slice: -100,
                        $each: [
                            {
                                reason: "Restored Client Statement",
                                creator: user.fullName,
                                price: productsTotalCosts,
                                createdAt: new Date(),
                            },
                        ],
                    },
                },
            },
            { session },
        );

        // Update purchaseSalary Prices
        await Clients.updateOne({ orgId, _id: bill.client }, { $inc: { purchases: -productsTotalCosts } }, { session });

        // Update Client Level
        await Clients.updateLevel({ orgId, clientId: bill.client });

        // Response
        await session.commitTransaction();
        return json(text("success"));
    } catch (error: any) {
        await session.abortTransaction();
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    } finally {
        session.endSession();
    }
};
