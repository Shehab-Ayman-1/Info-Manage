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
                $project: {
                    _id: 0,
                    productId: "$products.productId",
                    productName: "$products.source.name",
                    purchasePrice: "$products.purchasePrice",
                    soldPrice: "$products.soldPrice",
                    count: "$products.count",
                },
            },
        ]);

        return json(clientBills);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
