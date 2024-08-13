import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Products } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const products = await Products.aggregate([
            {
                $lookup: {
                    from: "companies",
                    as: "company",
                    localField: "company",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$company",
            },
            {
                $lookup: {
                    from: "categories",
                    as: "company.category",
                    localField: "company.category",
                    foreignField: "_id",
                },
            },
            {
                $match: {
                    "company.category.orgId": orgId,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    soldPrice: "$market.price",
                    boughtPrice: "$store.price",
                    company: {
                        _id: "$company._id",
                        name: "$company.name",
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
