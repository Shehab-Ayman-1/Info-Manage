import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

import { ClientBills, Clients, Products, Transactions } from "@/server/models";
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
        const { billBarcode, products } = createSchema.parse(body);

        const bill = await ClientBills.findOne({ orgId, type: "sale", barcode: billBarcode });
        if (!bill) return json("The Client Bill Not Found.", 400);

        const productsTotalCosts = products.reduce((prev, cur) => prev + cur.total, 0);
        const billProducts = products.map(({ total, ...product }) => product);

        // Check If The Products Count Is Exist In The Bill Products
        const isUnableProducts = products.some(({ count }) => {
            const unableProducts = bill.products.filter((product) => count > product.count);
            return unableProducts.length;
        });

        if (isUnableProducts) {
            await session.abortTransaction();
            return json(`Some Products Count Is Not Exist In The Client Bill`, 400);
        }

        // Check If The Locker Contain Restored Products Salary
        const { lockerCash } = await Transactions.getLockerCash(orgId);
        if (productsTotalCosts > lockerCash) {
            await session.abortTransaction();
            return json("Locker Doesn't Exist The Restored Total Products Costs.", 400);
        }

        // Return The Products To The Market
        await Promise.all(
            products.map(async ({ productId, count }) => {
                await Products.updateOne({ _id: productId }, { $inc: { "market.count": count } }, { session });
            }),
        );

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
        return json("The Statement Was Successfully Restored.");
    } catch (error: any) {
        await session.abortTransaction();
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    } finally {
        session.endSession();
    }
};

export const DELETE = async (req: NextRequest) => {
    const session = await mongoose.startSession();

    try {
        await DBConnection();
        session.startTransaction();

        const { userId, orgId, orgSlug } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);
        const organization = await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug });

        const { billBarcode } = await req.json();
        if (!billBarcode) return json("Something Went Wrong.", 400);

        const bill = await ClientBills.findOne({ orgId, barcode: billBarcode });
        if (!bill) return json("Something Went Wrong.", 400);

        // Check If The Locker Contain The Bill Amount
        const { lockerCash } = await Transactions.getLockerCash(orgId);
        if (bill.paid > lockerCash) return json("Locker Doen't Exist This Bill Cost.", 400);

        // Return The Bill Products To The Market Usign ProductId
        const promise = await Promise.all(
            bill.products.map(async ({ productId, count }) => {
                const updated = await Products.updateOne({ _id: productId }, { $inc: { "market.count": count } }, { session });
                return updated?.modifiedCount;
            }),
        );

        if (promise.includes(0)) {
            await session.abortTransaction();
            return json("Product(s) Not Return To The Market Again");
        }

        // Decreament The Client purchases Salary, pending, And Discounts
        await Clients.updateOne(
            { orgId, _id: bill.client },
            { $inc: { purchases: -bill.total, pending: -(bill.total - bill.paid), discounts: -bill.discount } },
            { session },
        );
        await Clients.updateLevel({ orgId, clientId: bill.client });

        const refreshAfter = +(organization?.publicMetadata?.refreshClientsPurchases as string)?.split(" ")[0];
        await Clients.updateLastRefreshDate({ orgId, clientId: bill.client, refreshAfter });

        // Delete The Bill
        await ClientBills.deleteOne({ orgId, _id: bill._id }, { session });

        // Create New Transaction
        await Transactions.updateOne(
            {
                orgId,
                method: "cash",
                process: "withdraw",
            },
            {
                $inc: { total: bill.paid },
                $push: {
                    history: {
                        $slice: -100,
                        $each: [
                            {
                                reason: "Canceled Client Bill",
                                creator: user.fullName,
                                price: bill.paid,
                                createdAt: new Date(),
                            },
                        ],
                    },
                },
            },
            { session },
        );

        // Response
        await session.commitTransaction();
        return json("The Client Bill Was Successfully Deleted.");
    } catch (error: any) {
        await session.abortTransaction();
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    } finally {
        session.endSession();
    }
};
