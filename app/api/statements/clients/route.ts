import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { Bills, Clients, Products, Transactions } from "@/server/models";
import { getExpireAt } from "@/utils/expireAt";
import { DBConnection } from "@/server/configs";
import { createSchema } from "./schema";
import { json } from "@/utils/response";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId, orgSlug } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);
        const organization = await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug });

        const body = await req.json();
        const { clientId, method, discount, process, ...data } = createSchema.parse(body);

        // Check If The Products Count Is Exist In The Market
        const promise = await Promise.all(
            data.products.map(async ({ productId, count }) => {
                const product = await Products.findById(productId);
                return count > product!.market.count && product!.name;
            }),
        );
        const promiseValues = promise.filter((item) => item);
        if (promiseValues.length) return json(`Not Enough ${promiseValues.join(" | ")}`, 400);

        // Create Bill
        const productsTotalCosts = data.products.reduce((prev, cur) => prev + cur.total, 0);
        const paid = process === "all" ? data.paid - discount : data.paid;

        const state = paid >= productsTotalCosts - discount ? "completed" : "pending";
        const billProducts = data.products.map(({ total, ...product }) => product);

        const total = productsTotalCosts - discount;

        const expireAt = await getExpireAt();
        await Bills.create({ orgId, paid, total, discount, expireAt, state, client: clientId, products: billProducts });

        // Create New Transaction
        const reason = "Client Statement";
        await Transactions.create({ orgId, reason, method, process: "deposit", creator: user.fullName, price: paid });

        // Update Products Price By The Current Prices, And Dec The Count From The Market
        await Promise.all(
            data.products.map(async ({ productId, soldPrice, count }) => {
                return await Products.updateOne(
                    { _id: productId },
                    { "market.price": soldPrice, "market.updatedAt": new Date(), $inc: { "market.count": -count } },
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

        const refreshAfter = +(organization?.publicMetadata?.refreshClientsPurchases as string)?.split(" ")[0];
        await Clients.updateLastRefreshDate({ orgId, clientId, refreshAfter });

        // Response
        return json("The Statement Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
