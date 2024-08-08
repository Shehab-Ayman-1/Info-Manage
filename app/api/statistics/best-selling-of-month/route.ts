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

        const { searchParams } = new URL(req.url);
        const month = searchParams.get("month")!;

        const selectedMonth = new Date(month).getMonth() + 1;
        const thisMonth = new Date(month);
        const nextMonth = new Date(new Date(month).setMonth(selectedMonth));

        const products = await Bills.aggregate([
            {
                $match: {
                    orgId,
                    createdAt: { $gte: thisMonth, $lt: nextMonth },
                },
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "products.companyId",
                    foreignField: "_id",
                    as: "products.company",
                },
            },
            {
                $group: {
                    _id: { name: "$products.name", company: "$products.company.name", companyId: "$products.companyId" },
                    sold_count: { $sum: "$products.count" },
                },
            },
            {
                $project: {
                    _id: 0,
                    product: "$_id.name",
                    company: { $arrayElemAt: ["$_id.company", 0] },
                    sold_count: 1,
                },
            },
            {
                $sort: {
                    sold_count: -1,
                },
            },
        ]);

        return json(products);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
