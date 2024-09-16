import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { ClientInvoices } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const year = new Date().getFullYear();
        const thisYear = new Date(`${year}-1-1`);
        const nextYear = new Date(`${+year + 1}-1-1`);

        const products = await ClientInvoices.aggregate([
            {
                $match: { orgId, type: "sale", createdAt: { $gte: thisYear, $lt: nextYear } },
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
                $lookup: {
                    from: "companies",
                    localField: "products.source.company",
                    as: "products.source.company",
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
                    totalCount: 1,
                    product: "$_id.name",
                    company: { $arrayElemAt: ["$_id.company", 0] },
                },
            },
            {
                $sort: {
                    totalCount: -1,
                },
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
