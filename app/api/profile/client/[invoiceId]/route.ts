import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { ClientInvoices } from "@/server/models";
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
                $unwind: {
                    path: "$products",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: { from: "products", localField: "products.productId", foreignField: "_id", as: "products.source" },
            },
            {
                $unwind: {
                    path: "$products.source",
                    preserveNullAndEmptyArrays: true,
                },
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

        console.log(invoice);

        return json(!invoice.products[0].total ? { ...invoice, products: [] } : invoice);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
