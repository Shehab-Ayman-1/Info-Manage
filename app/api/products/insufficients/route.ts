import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { DBConnection } from "@/server/configs";
import { Suppliers } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const supplierId = searchParams.get("supplierId")!;
        const place = searchParams.get("place") as "all" | "market" | "store";

        const insufficients = await Suppliers.aggregate([
            {
                $match:
                    supplierId === "all" ? { orgId, trash: false } : { orgId, trash: false, _id: new Types.ObjectId(supplierId) },
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: { from: "products", as: "product", localField: "products", foreignField: "_id" },
            },
            {
                $unwind: "$product",
            },
            {
                $match: { $expr: { $lt: [`$product.${place}.count`, "$product.min"] } },
            },
            {
                $lookup: { from: "companies", as: "product.company", localField: "product.company", foreignField: "_id" },
            },
            {
                $unwind: "$product.company",
            },
            {
                $project: {
                    _id: 1,
                    company: "$product.company.name",
                    product: "$product.name",
                    productId: "$product._id",
                    unit: "$product.unit",
                    minimum: "$product.min",
                    soldPrice: "$product.market.price",
                    purchasePrice: "$product.store.price",
                    marketCount: "$product.market.count",
                    storeCount: "$product.store.count",
                },
            },
        ]);

        return json(insufficients);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
