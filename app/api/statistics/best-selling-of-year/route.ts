import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Bills } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const year = new Date().getFullYear();
        const thisYear = new Date(`${year}-1-1`);
        const nextYear = new Date(`${+year + 1}-1-1`);

        const products = await Bills.aggregate([
            { $match: { orgId, createdAt: { $gte: thisYear, $lt: nextYear } } },
            { $unwind: "$products" },
            { $lookup: { from: "companies", foreignField: "_id", localField: "products.companyId", as: "products.company" } },
            {
                $group: {
                    _id: { name: "$products.name", company: "$products.company.name", companyId: "$products.companyId" },
                    totalCount: { $sum: "$products.count" },
                },
            },
            {
                $project: {
                    _id: 0,
                    product: "$_id.name",
                    company: { $arrayElemAt: ["$_id.company", 0] },
                    totalCount: 1,
                },
            },
            {
                $sort: { totalCount: -1 },
            },
        ]);

        return json(products);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
