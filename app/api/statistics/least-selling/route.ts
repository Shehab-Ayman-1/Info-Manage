import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Products } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

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
                $match: { "company.category.orgId": orgId, "market.updatedAt": { $lte: thisMonth } },
            },
            {
                $project: {
                    _id: "$_id",
                    company: "$company.name",
                    product: "$name",
                    last_sold: "$market.updatedAt",
                },
            },
        ]);

        return json(products);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
