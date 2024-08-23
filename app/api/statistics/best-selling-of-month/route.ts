import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { ClientBills } from "@/server/models";
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

        const products = await ClientBills.aggregate([
            { $match: { orgId, createdAt: { $gte: thisMonth, $lt: nextMonth } } },
            { $unwind: "$products" },
            { $lookup: { from: "products", as: "products.source", localField: "products.productId", foreignField: "_id" } },
            { $unwind: "$products.source" },
            {
                $lookup: {
                    from: "companies",
                    as: "products.source.company",
                    localField: "products.source.company",
                    foreignField: "_id",
                },
            },
            {
                $group: {
                    _id: {
                        name: "$products.source.name",
                        company: "$products.source.company.name",
                        companyId: "$products.source.company._id",
                    },
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
            {
                $limit: 10,
            },
        ]);

        return json(products);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
