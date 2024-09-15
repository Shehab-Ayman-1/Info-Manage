import { auth } from "@clerk/nextjs/server";

import { ClientInvoices, Clients, Products, SupplierInvoices, Suppliers, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { mainReasons } from "@/constants/finances";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

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
            {
                $match: { orgId, trash: false },
            },
            {
                $group: {
                    _id: null,
                    pending: { $sum: "$pending" },
                },
            },
        ]);

        const [supplierDebts] = await Suppliers.aggregate([
            { $match: { orgId, trash: false } },
            {
                $group: {
                    _id: null,
                    pending: { $sum: "$pending" },
                },
            },
        ]);

        const [salesReceipt] = await ClientInvoices.aggregate([
            {
                $match: { orgId, type: "sale", createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: null,
                    sales: { $sum: { $multiply: ["$products.count", "$products.soldPrice"] } },
                },
            },
        ]);

        const [purchasesReceipt] = await SupplierInvoices.aggregate([
            {
                $match: { orgId, type: "purchase", createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: null,
                    purchases: { $sum: { $multiply: ["$products.count", "$products.price"] } },
                },
            },
        ]);

        const [todayWithdrawTransaction] = await Transactions.aggregate([
            {
                $match: { orgId, process: "withdraw" },
            },
            {
                $unwind: "$history",
            },
            {
                $match: {
                    "history.reason": { $nin: mainReasons },
                    "history.createdAt": { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$history.price" },
                },
            },
        ]);

        const data = {
            locker: {
                cash: lockerCash || 0,
                visa: lockerVisa || 0,
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
            receipts: {
                purchases: (purchasesReceipt?.purchases || 0) - (todayWithdrawTransaction?.total || 0),
                sales: salesReceipt?.sales || 0,
            },
        };

        return json(data);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
