import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { SupplierInvoices, Products, Suppliers, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { getTranslations } from "@/utils/getTranslations";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date")!;

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const supplierInvoices = await SupplierInvoices.aggregate([
            {
                $match: { orgId, createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                $lookup: { from: "suppliers", as: "suppliers", localField: "supplier", foreignField: "_id" },
            },
            {
                $unwind: "$suppliers",
            },
            {
                $project: {
                    _id: 1,
                    total: 1,
                    paid: 1,
                    state: 1,
                    supplier: "$suppliers.name",
                    pending: { $subtract: ["$total", "$paid"] },
                    createdAt: "$createdAt",
                },
            },
        ]);

        return json(supplierInvoices);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("suppliers.show-invoices.delete");

        const user = await clerkClient().users.getUser(userId);
        if (!user) return json(text("wrong"), 400);

        const { invoiceId } = await req.json();
        if (!invoiceId) return json(text("wrong"), 400);

        const invoice = await SupplierInvoices.findById(invoiceId);
        if (!invoice) return json(text("wrong"), 400);

        // Return The Products To The Store From Supplier Ref
        await Promise.all([
            invoice.products.map(async ({ name, count }) => {
                const supplier = await Suppliers.findOne({ orgId, _id: invoice.supplier, trash: false }).populate({
                    path: "products",
                    match: { name },
                    justOne: true,
                });
                const productId = (supplier?.products as any)._id;
                await Products.updateOne({ _id: productId, trash: false }, { $inc: { "store.count": -count } });
            }),
        ]);

        // Decreament The Supplier pending
        if (invoice.total - invoice.paid > 0)
            await Suppliers.updateOne(
                { orgId, _id: invoice.supplier, trash: false },
                { $inc: { pending: -(invoice.total - invoice.paid) } },
            );

        // Delete The Supplier Invoice
        const deleted = await SupplierInvoices.deleteOne({ orgId, _id: invoiceId });
        if (!deleted.deletedCount) return json(text("wrong"), 400);

        // Create New Transaction
        await Transactions.updateOne(
            {
                orgId,
                method: "cash",
                process: "deposit",
            },
            {
                $inc: { total: invoice.paid },
                $push: {
                    history: {
                        $slice: -100,
                        $each: [
                            {
                                reason: "Canceled Supplier Invoice",
                                creator: user.fullName,
                                price: invoice.paid,
                                createdAt: new Date(),
                            },
                        ],
                    },
                },
            },
        );

        // Response
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
