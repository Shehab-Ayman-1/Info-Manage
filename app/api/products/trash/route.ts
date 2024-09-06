import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Products } from "@/server/models";
import { json } from "@/utils/response";
import { getTranslations } from "@/utils/getTranslations";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const trashProducts = await Products.aggregate([
            {
                $lookup: { from: "companies", as: "company", localField: "company", foreignField: "_id" },
            },
            {
                $unwind: "$company",
            },
            {
                $lookup: { from: "categories", as: "company.category", localField: "company.category", foreignField: "_id" },
            },
            {
                $unwind: "$company.category",
            },
            {
                $match: { "company.category.orgId": orgId, trash: true },
            },
            {
                $project: {
                    _id: 1,
                    category: "$company.category.name",
                    company: "$company.name",
                    product: "$name",
                    barcode: "$barcode",
                    unit: "$unit",
                    marketCount: "$market.count",
                    storeCount: "$store.count",
                },
            },
        ]);

        return json(trashProducts);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("products.trash-products.put");

        const { productId } = await req.json();
        if (!productId) return json(text("wrong"), 400);

        const updated = await Products.updateOne({ _id: productId }, { trash: false });
        console.log(updated);
        if (!updated.modifiedCount) return json(text("wrong"), 400);

        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
