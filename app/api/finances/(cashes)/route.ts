import { auth } from "@clerk/nextjs/server";

import { Clients, Products, Suppliers, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { lockerCash, lockerVisa } = await Transactions.getLockerCash(orgId);

        const [productsCashes] = await Products.aggregate([
            {
                $lookup: { from: "companies", localField: "company", foreignField: "_id", as: "company" },
            },
            {
                $unwind: "$company",
            },
            {
                $lookup: { from: "categories", localField: "company.category", foreignField: "_id", as: "company.category" },
            },
            {
                $unwind: "$company.category",
            },
            {
                $match: { "company.category.orgId": orgId, trash: false },
            },
            {
                $project: {
                    _id: 0,
                    market: {
                        purchasePrice: { $multiply: ["$market.count", "$store.price"] },
                        sellingPrice: { $multiply: ["$market.count", "$market.price"] },
                    },
                    store: {
                        purchasePrice: { $multiply: ["$store.count", "$store.price"] },
                        sellingPrice: { $multiply: ["$store.count", "$market.price"] },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    marketPurchasePrice: { $sum: "$market.purchasePrice" },
                    marketSellingPrice: { $sum: "$market.sellingPrice" },
                    storePurchasePrice: { $sum: "$store.purchasePrice" },
                    storeSellingPrice: { $sum: "$store.sellingPrice" },
                },
            },
        ]);

        const [clientDebts] = await Clients.aggregate([
            { $match: { orgId } },
            {
                $group: {
                    _id: null,
                    pending: { $sum: "$pending" },
                },
            },
        ]);

        const [supplierDebts] = await Suppliers.aggregate([
            { $match: { orgId } },
            {
                $group: {
                    _id: null,
                    pending: { $sum: "$pending" },
                },
            },
        ]);

        const data = {
            locker: {
                cash: lockerCash,
                visa: lockerVisa,
            },
            market: {
                purchasePrice: productsCashes?.marketPurchasePrice || 0,
                sellingPrice: productsCashes?.marketSellingPrice || 0,
            },
            store: {
                purchasePrice: productsCashes?.storePurchasePrice || 0,
                sellingPrice: productsCashes?.storeSellingPrice || 0,
            },
            debts: {
                clients: clientDebts?.pending || 0,
                suppliers: supplierDebts?.pending || 0,
            },
        };

        return json(data);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
