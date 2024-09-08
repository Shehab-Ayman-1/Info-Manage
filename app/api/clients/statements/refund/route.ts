import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

import { ClientInvoices, Clients, Products, Transactions } from "@/server/models";
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
        const text = await getTranslations("clients.refund-statement.post");

        const body = await req.json();
        const { invoiceBarcode, products } = createSchema.parse(body);

        const invoice = await ClientInvoices.findOne({ orgId, type: "sale", barcode: invoiceBarcode }).session(session);
        if (!invoice) {
            await session.abortTransaction();
            return json(text("missing-invoice"), 400);
        }

        const productsTotalCosts = products.reduce((prev, cur) => prev + cur.total, 0);
        const invoiceProducts = products.map(({ total, ...product }) => product);

        // Check If The Products Count Is Exist In The Invoice Products
        const isUnableProducts = products.some(({ productId, count }) => {
            const product = invoice.products.find((product) => productId === String(product.productId));
            return count > (product?.count || 0);
        });

        if (isUnableProducts) {
            await session.abortTransaction();
            return json(text("products-not-exist"), 400);
        }

        // Check If The Locker Contain Refundd Products Salary
        const { lockerCash } = await Transactions.getLockerCash(orgId);
        if (productsTotalCosts > lockerCash) {
            await session.abortTransaction();
            return json(text("locker-not-enough"), 400);
        }

        // Return The Products To The Market
        const promise = await Promise.all(
            products.map(async ({ productId, count }) => {
                const updated = await Products.updateOne(
                    { _id: productId, trash: false },
                    { $inc: { "market.count": count } },
                    { session },
                );
                return updated.modifiedCount;
            }),
        );

        if (promise.includes(0)) {
            await session.abortTransaction();
            return json("wrong", 400);
        }

        // Create Client Invoice
        const expireAt = await getExpireAt();
        await ClientInvoices.create(
            [
                {
                    orgId,
                    client: invoice.client,
                    barcode: invoiceBarcode,
                    paid: productsTotalCosts,
                    total: productsTotalCosts,
                    products: invoiceProducts,
                    discount: 0,
                    type: "refund",
                    state: "refund",
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
                                reason: "Refundd Client Statement",
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
        await Clients.updateOne(
            { orgId, _id: invoice.client, trash: false },
            { $inc: { purchases: -productsTotalCosts } },
            { session },
        );

        // Update Client Level
        await Clients.updateLevel({ orgId, clientId: invoice.client });

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
