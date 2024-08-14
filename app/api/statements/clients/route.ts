import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { Bills, Clients, Products, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { createSchema } from "./schema";
import { json } from "@/utils/response";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const { firstName, lastName } = await clerkClient().users.getUser(userId);

        const body = await req.json();
        const { clientId, method, discount, process, ...data } = createSchema.parse(body);

        // Check If The Products Count Is Exist In The Market
        const promise = await Promise.all(
            data.products.map(async ({ name, productId, count }) => {
                const product = await Products.findById(productId);
                return count > product!.market.count && name;
            }),
        );
        const promiseValues = promise.filter((item) => item);
        if (promiseValues.length) return json(`Not Enough ${promiseValues.join(" | ")}`, 400);

        // Create Bill
        const productsTotalCosts = data.products.reduce((prev, cur) => prev + cur.total, 0);
        const paid = process === "all" ? data.paid - discount : data.paid;
        const total = productsTotalCosts - discount;

        // Create New Bill
        await Bills.create({
            orgId,
            paid,
            total,
            discount,
            client: clientId,
            state: paid >= productsTotalCosts - discount ? "completed" : "pending",
            products: data.products.map(({ productId, total, ...product }) => product),
        });

        // Create New Transaction
        const creator = `${firstName} ${lastName}`;
        const reason = "Client Statement";
        await Transactions.create({
            orgId,
            method,
            process: "deposit",
            creator,
            reason,
            price: productsTotalCosts,
        });

        // Update Products Price By The Current Prices, And Dec The Count From The Market
        await Promise.all(
            data.products.map(async ({ productId, soldPrice, count }) => {
                return await Products.updateOne(
                    { _id: productId },
                    {
                        $inc: { "market.count": -count },
                        "market.price": soldPrice,
                        "market.updatedAt": new Date(),
                    },
                );
            }),
        );

        // Update Client Pending, purchaseSalary Prices
        await Clients.updateOne(
            { orgId, _id: clientId },
            { $inc: { purchasesSalary: total, pendingCosts: total - paid, discounts: discount } },
        );

        // Update Client Level
        await Clients.updateLevel({ orgId, clientId });
        await Clients.updateLastRefreshDate({ orgId, clientId });

        // Response
        return json("The Statement Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
