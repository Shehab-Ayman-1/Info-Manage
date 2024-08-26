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
        const place = searchParams.get("place") as "market" | "store";

        const insufficients = await Suppliers.aggregate([
            {
                $match: supplierId === "all" ? { orgId } : { orgId, _id: new Types.ObjectId(supplierId) },
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
                    product: "$product.name",
                    company: "$product.company.name",
                    barcode: "$product.barcode",
                    minimum: "$product.min",
                    price: `$product.${place}.price`,
                    current_count: `$product.${place}.count`,
                    totalNeeded: {
                        $multiply: [`$product.${place}.price`, { $subtract: ["$product.min", `$product.${place}.count`] }],
                    },
                },
            },
        ]);

        return json(insufficients);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
