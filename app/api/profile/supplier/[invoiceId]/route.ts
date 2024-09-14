import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { SupplierInvoices } from "@/server/models";
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
                $unwind: {
                    path: "$products",
                    preserveNullAndEmptyArrays: true,
                },
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

        return json(!invoice.products[0].total ? { ...invoice, products: [] } : invoice);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
