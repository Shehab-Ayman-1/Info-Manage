import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { Debts, Products, Suppliers, Transactions } from "@/server/models";
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
        const { supplierId, method, place, paid, products } = createSchema.parse(body);

        // Check If The Products Total Costs Exist In The Locker ?
        const lockerCash = await Transactions.getLockerMoney(orgId);
        const productsTotalCosts = products.reduce((prev, cur) => prev + cur.total, 0);
        if (method === "cash" && productsTotalCosts > lockerCash.currentAmount)
            return json("Locker Doesn't Have This Statement Cost.", 400);

        const filterProducts = products.map(({ name, count, price }) => ({ name, count, price }));

        // Create Bill
        await Debts.create({
            orgId,
            paid,
            supplier: supplierId,
            state: paid >= productsTotalCosts ? "completed" : "pending",
            total: productsTotalCosts,
            products: filterProducts,
        });

        // Make Transaction
        await Transactions.create({
            orgId,
            method,
            process: "withdraw",
            reason: "Supplier Statement",
            price: productsTotalCosts,
            creator: `${firstName} ${lastName}`,
        });

        // Update Products Price By The Current Prices, And Increament The Purchase Products Count
        const placePrice = place === "market" ? "market.price" : "store.price";
        const placeCount = place === "market" ? "market.count" : "store.count";
        const promise = await Promise.all(
            products.map(async ({ productId, price, count }) => {
                const updated = await Products.updateOne(
                    { _id: productId },
                    { [placePrice]: price, $inc: { [placeCount]: count } },
                );
                return updated.modifiedCount;
            }),
        );
        if (promise.includes(0)) return json("Some Of The Products Was Not Updated, Something Went Wrong.", 400);

        // Update Supplier Pending, purchaseSalary Prices
        await Suppliers.updateOne({ _id: supplierId }, { $inc: { pendingCosts: productsTotalCosts - paid } });

        // Response
        return json("The Statement Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
