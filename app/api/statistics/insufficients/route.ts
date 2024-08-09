import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Suppliers } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const name = searchParams.get("supplier");
        const place = searchParams.get("place") as "market" | "store";

        const insufficients = await Suppliers.aggregate([
            {
                $match: { orgId, name },
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: {
                    from: "products",
                    as: "product",
                    localField: "products",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$product",
            },
            {
                $match: {
                    $expr: {
                        $lt: [`$product.${place}.count`, "$product.min"],
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    product: "$product.name",
                    price: `$product.${place}.price`,
                    current_count: `$product.${place}.count`,
                    needed_count: { $subtract: ["$product.min", `$product.${place}.count`] },
                    total: {
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
