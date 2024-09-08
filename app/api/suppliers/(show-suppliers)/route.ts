import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { Suppliers } from "@/server/models";
import { editSchema } from "./schema";
import { json } from "@/utils/response";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const suppliers = await Suppliers.aggregate([
            {
                $match: { orgId, trash: false },
            },
            {
                $lookup: { from: "products", as: "products", localField: "products", foreignField: "_id" },
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: { from: "companies", as: "company", localField: "products.company", foreignField: "_id" },
            },
            {
                $unwind: "$company",
            },
            {
                $group: {
                    _id: "$_id",
                    supplier: { $first: "$name" },
                    phone: { $first: "$phone" },
                    pending: { $first: "$pending" },
                    companies: {
                        $addToSet: {
                            _id: "$company._id",
                            name: "$company.name",
                        },
                    },
                    products: {
                        $push: {
                            _id: "$products._id",
                            name: { $concat: ["$products.barcode", " >> ", "$products.name"] },
                            company: "$products.company",
                            companyName: "$company.name",
                        },
                    },
                },
            },
        ]);
        return json(suppliers);
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
        const text = await getTranslations("suppliers.show-suppliers.put");

        const body = await req.json();
        const { supplierId, name, phone } = editSchema.parse(body);

        await Suppliers.updateOne({ orgId, _id: supplierId, trash: false }, { name, phone });
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("suppliers.show-suppliers.delete");

        const { supplierId } = await req.json();
        if (!supplierId) return json(text("wrong"), 400);

        const updated = await Suppliers.updateOne(
            { orgId, _id: supplierId, trash: false },
            { trash: true, trashedAt: Date.now() + 1000 * 60 * 60 * 24 * 90 },
        );
        if (!updated.modifiedCount) return json(text("wrong"), 400);

        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
