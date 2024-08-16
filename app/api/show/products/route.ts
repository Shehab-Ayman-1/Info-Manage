import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Products } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { searchParams } = new URL(req.url);
        const place = searchParams.get("place") as "store" | "market";

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const products = await Products.aggregate([
            {
                $lookup: {
                    from: "companies",
                    as: "companyDetails",
                    localField: "company",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$companyDetails",
            },
            {
                $lookup: {
                    from: "categories",
                    as: "categoryDetails",
                    localField: "companyDetails.category",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$categoryDetails",
            },
            {
                $match: { "categoryDetails.orgId": orgId },
            },
            {
                $project: {
                    _id: 1,
                    barcode: "$barcode",
                    product: "$name",
                    company: "$companyDetails.name",
                    category: "$categoryDetails.name",
                    count: place === "market" ? "$market.count" : "$store.count",
                    price: place === "market" ? "$market.price" : "$store.price",
                    total: {
                        $multiply: [
                            place === "market" ? "$market.count" : "$store.count",
                            place === "market" ? "$market.price" : "$store.price",
                        ],
                    },
                },
            },
        ]);

        return json(products);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
