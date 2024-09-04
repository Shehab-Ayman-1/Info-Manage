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

        const { userId, orgId, orgSlug } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("clients.new-statement.post");

        const user = await clerkClient().users.getUser(userId);
        const organization = await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug });

        const body = await req.json();
        const { clientId, method, discount, process, ...data } = createSchema.parse(body);

        // Check If The Products Count Is Exist In The Market
        const promise = await Promise.all(
            data.products.map(async ({ productId, count }) => {
                const product = await Products.findById(productId).session(session);
                return count > product!.market.count && product!.name;
            }),
        );

        const promiseValues = promise.filter((item) => item);
        if (promiseValues.length) {
            await session.abortTransaction();
            return json(`${text("not-enough")} ${promiseValues.join(" | ")}`, 400);
        }

        // Create Bill
        const productsTotalCosts = data.products.reduce((prev, cur) => prev + cur.total, 0);
        const paid = process === "all" ? data.paid - discount : data.paid;

        const state = paid >= productsTotalCosts - discount ? "completed" : "pending";
        const billProducts = data.products.map(({ total, ...product }) => product);

        const total = productsTotalCosts - discount;
        const expireAt = await getExpireAt();
        await ClientBills.create(
            [
                {
                    orgId,
                    client: clientId,
                    barcode: Date.now(),
                    type: "sale",
                    paid,
                    total,
                    discount,
                    expireAt,
                    state,
                    products: billProducts,
                    createdAt: new Date(),
                },
            ],
            { session },
        );

        // Add New Transaction
        await Transactions.updateOne(
            { orgId, method, process: "deposit" },
            {
                $inc: { total: paid },
                $push: {
                    history: {
                        $slice: -100,
                        $each: [
                            {
                                creator: user.fullName,
                                reason: "Client Statement",
                                price: paid,
                                createdAt: new Date(),
                            },
                        ],
                    },
                },
            },
            { session },
        ).session(session);

        // Update Products Price By The Current Prices, And Dec The Count From The Market
        await Promise.all(
            data.products.map(async ({ productId, soldPrice, count }) => {
                return await Products.updateOne(
                    { _id: productId },
                    { "market.price": soldPrice, "market.updatedAt": new Date(), $inc: { "market.count": -count } },
                    { session },
                );
            }),
        );

        // Update Client Pending, purchaseSalary Prices
        const totalProfits = data.products.reduce((prev, cur) => prev + cur.count * (cur.soldPrice - cur.purchasePrice), 0);
        await Clients.updateOne(
            { orgId, _id: clientId },
            { $inc: { totalProfits, purchases: total, pending: total - paid, discounts: discount } },
            { session },
        );

        // Update Client Level & RefreshDate
        const refreshAfter = +(organization?.publicMetadata?.refreshClientsPurchases as string)?.split(" ")[0];
        await Clients.updateLastRefreshDate({ orgId, clientId, refreshAfter });
        await Clients.updateLevel({ orgId, clientId });

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
