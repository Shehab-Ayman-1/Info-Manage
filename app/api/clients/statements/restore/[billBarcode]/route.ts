import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { auth } from "@clerk/nextjs/server";
import { json } from "@/utils/response";
import { ClientBills } from "@/server/models";

type ResponseType = {
    params: { billBarcode: string };
};

export const GET = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const billBarcode = res.params.billBarcode;

        const clientBills = await ClientBills.aggregate([
            {
                $match: { orgId, barcode: +billBarcode },
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: { from: "products", localField: "products.productId", as: "products.source", foreignField: "_id" },
            },
            {
                $unwind: "$products.source",
            },
            {
                $group: {
                    _id: "$products.productId",
                    productName: { $first: "$products.source.name" },
                    purchasePrice: { $first: "$products.purchasePrice" },
                    soldPrice: { $first: "$products.soldPrice" },
                    saleCount: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "sale"] }, "$products.count", 0],
                        },
                    },
                    restoreCount: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "restore"] }, "$products.count", 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    productName: 1,
                    purchasePrice: 1,
                    soldPrice: 1,
                    count: { $subtract: ["$saleCount", "$restoreCount"] },
                },
            },
        ]);


        return json(clientBills);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
