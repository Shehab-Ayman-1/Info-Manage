import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Products } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const from = searchParams.get("startDate")!;
        const to = searchParams.get("endDate")!;

        const startDate = new Date(from);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(to);
        endDate.setHours(23, 59, 59, 999);

        const thisMonth = new Date();
        thisMonth.setDate(1);

        const products = await Products.aggregate([
            {
                $lookup: { from: "companies", localField: "company", as: "company", foreignField: "_id" },
            },
            {
                $unwind: "$company",
            },
            {
                $lookup: { from: "categories", localField: "company.category", as: "company.category", foreignField: "_id" },
            },
            {
                $match: { "company.category.orgId": orgId, "market.updatedAt": { $gte: startDate, $lte: endDate }, trash: false },
            },
            {
                $project: {
                    _id: "$_id",
                    company: "$company.name",
                    product: "$name",
                    minimum: "$min",
                    unit: "$unit",
                    lastSold: "$market.updatedAt",
                },
            },
        ]);

        return json(products);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
