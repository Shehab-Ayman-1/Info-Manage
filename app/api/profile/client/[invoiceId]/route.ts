import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { ClientInvoices, Clients, Transactions } from "@/server/models";
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

        const [invoice] = await ClientInvoices.aggregate([
            {
                $match: { orgId, _id: new Types.ObjectId(invoiceId) },
            },
            {
                $lookup: { from: "clients", localField: "client", foreignField: "_id", as: "client" },
            },
            {
                $unwind: "$client",
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: { from: "products", localField: "products.productId", foreignField: "_id", as: "products.source" },
            },
            {
                $unwind: "$products.source",
            },
            {
                $lookup: {
                    from: "companies",
                    as: "products.source.company",
                    localField: "products.source.company",
                    foreignField: "_id",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    client: { $first: { name: "$client.name", level: "$client.level" } },
                    barcode: { $first: "$barcode" },
                    paid: { $first: "$paid" },
                    total: { $first: "$total" },
                    state: { $first: "$state" },
                    discount: { $first: "$discount" },
                    createdAt: { $first: "$createdAt" },

                    invoiceProfits: {
                        $sum: {
                            $subtract: [
                                { $multiply: ["$products.count", "$products.soldPrice"] },
                                { $multiply: ["$products.count", "$products.purchasePrice"] },
                            ],
                        },
                    },

                    products: {
                        $push: {
                            company: { $first: "$products.source.company.name" },
                            product: "$products.source.name",
                            count: "$products.count",
                            price: "$products.soldPrice",
                            total: { $multiply: ["$products.count", "$products.soldPrice"] },
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

        const { userId, orgId, orgSlug } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("profile.client.put");

        const user = await clerkClient().users.getUser(userId);
        const organization = await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug });

        const { amount } = await req.json();
        const { invoiceId } = res.params;

        const invoice = await ClientInvoices.findById(invoiceId);
        if (!invoice) return json(text("wrong"), 400);
        if (invoice.state === "completed") return json(text("already-exist"), 400);

        // Update The Invoice Salaries
        if (amount > invoice.total - invoice.paid) return json(text("salary-check"), 400);
        const state = invoice.paid + amount >= invoice.total ? "completed" : "pending";
        await ClientInvoices.updateOne({ orgId, _id: invoiceId }, { $inc: { paid: amount }, state });

        // Update The Client Salaries
        await Clients.updateOne({ orgId, _id: invoice.client, trash: false }, { $inc: { pending: -amount } });

        const refreshAfter = +(organization?.publicMetadata?.refreshClientsPurchases as string)?.split(" ")[0];
        await Clients.updateLastRefreshDate({ orgId, clientId: invoice.client, refreshAfter });

        // Create Transaction

        await Transactions.updateOne(
            {
                orgId,
                method: "cash",
                process: "deposit",
            },
            {
                $inc: { total: amount },
                $push: {
                    history: {
                        $slice: -100,
                        $each: [
                            {
                                creator: user.fullName,
                                reason: "Client Invoice Payment",
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
