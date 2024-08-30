import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { SupplierBills, Products, Suppliers, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { getExpireAt } from "@/utils/expireAt";
import { createSchema } from "./schema";
import { json } from "@/utils/response";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);

        const body = await req.json();
        const { supplierId, method, place, process, paid, products } = createSchema.parse(body);

        // Check If The Products Total Costs Exist In The Locker ?
        const { lockerCash, lockerVisa } = await Transactions.getLockerCash(orgId);
        const productCosts = products.reduce((prev, cur) => prev + cur.total, 0);

        if (process === "all") {
            if (method === "cash" && productCosts > lockerCash) return json("Locker Doesn't Have This Statement Cost.", 400);
            if (method === "visa" && productCosts > lockerVisa) return json("Visa Doesn't Have This Statement Cost.", 400);
        }
        if (process === "milestone") {
            if (method === "cash" && paid > lockerCash) return json("Locker Doesn't Have This Paid Cost.", 400);
            if (method === "visa" && paid > lockerVisa) return json("Visa Doesn't Have This Paid Cost.", 400);
        }

        // Create Bill
        const billProducts = products.map(({ name, count, price }) => ({ name, count, price }));
        const state = paid >= productCosts ? "completed" : "pending";

        const expireAt = await getExpireAt();
        await SupplierBills.create({
            orgId,
            barcode: Date.now(),
            type: "purchase",
            paid,
            state,
            expireAt,
            supplier: supplierId,
            total: productCosts,
            products: billProducts,
            createdAt: new Date(),
        });

        // Make Transaction
        const reason = "Supplier Statement";
        await Transactions.create({
            orgId,
            reason,
            method,
            process: "withdraw",
            price: paid,
            creator: user.fullName,
            createdAt: new Date(),
        });

        // Update Products Price By The Current Prices, And Increament The Purchase Products Count
        const placeCount = place === "market" ? "market.count" : "store.count";
        const promise = await Promise.all(
            products.map(async ({ productId, price, count }) => {
                const updated = await Products.updateOne(
                    { _id: productId },
                    { "store.price": price, $inc: { [placeCount]: count } },
                );
                return updated.modifiedCount;
            }),
        );
        if (promise.includes(0)) return json("Some Of The Products Was Not Updated, Something Went Wrong.", 400);

        // Update Supplier Pending, purchaseSalary Prices
        await Suppliers.updateOne({ _id: supplierId }, { $inc: { pending: productCosts - paid } });

        // Response
        return json("The Statement Was Successfully Created.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
