import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { SupplierInvoices, Suppliers, Transactions } from "@/server/models";
import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

type ResponseType = {
    params: { invoiceId: string };
};

export const GET = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { invoiceId } = res.params;
        const [invoice] = await SupplierInvoices.aggregate([
            {
                $match: { orgId, _id: new Types.ObjectId(invoiceId) },
            },
            {
                $lookup: { from: "suppliers", localField: "supplier", foreignField: "_id", as: "supplier" },
            },
            {
                $unwind: "$supplier",
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$_id",
                    supplier: { $first: "$supplier.name" },
                    paid: { $first: "$paid" },
                    total: { $first: "$total" },
                    state: { $first: "$state" },
                    discount: { $first: "$discount" },
                    createdAt: { $first: "$createdAt" },
                    products: {
                        $push: {
                            product: "$products.name",
                            count: "$products.count",
                            price: "$products.price",
                            total: { $multiply: ["$products.count", "$products.price"] },
                        },
                    },
                },
            },
        ]);

        return json(invoice);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const PUT = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);
        const text = await getTranslations("profile.supplier.put");

        const { amount } = await req.json();
        const { invoiceId } = res.params;

        const invoice = await SupplierInvoices.findById(invoiceId);
        if (!invoice) return json(text("wrong"), 400);
        if (invoice.state === "completed") return json(text("already-completed"), 400);

        // Check If The Amount In The Locker Cash
        const { lockerCash } = await Transactions.getLockerCash(orgId);
        if (amount > lockerCash) return json(text("not-enough"), 400);

        // Update The Supplier Invoice Salaries
        if (amount > invoice.total - invoice.paid) return json(text("money-check"), 400);
        await SupplierInvoices.updateOne(
            { orgId, _id: invoiceId },
            { $inc: { paid: amount }, state: invoice.paid + amount >= invoice.total ? "completed" : "pending" },
        );

        // Update The Supplier Salaries
        await Suppliers.updateOne({ orgId, _id: invoice.supplier, trash: false }, { $inc: { pending: -amount } });

        // Create Transaction
        await Transactions.updateOne(
            {
                orgId,
                method: "cash",
                process: "withdraw",
            },
            {
                $inc: { total: amount },
                $push: {
                    history: {
                        $slice: -100,
                        $each: [
                            {
                                reason: "Supplier Invoice Payment",
                                creator: user.fullName,
                                price: amount,
                                createdAt: new Date(),
                            },
                        ],
                    },
                },
            },
        );

        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
