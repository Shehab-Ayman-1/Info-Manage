import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { Clients, Products, Suppliers } from "@/server/models";
import { json } from "@/utils/response";

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
                    type: "product",
                    deletedName: { $concat: ["$company.category.name", " >> ", "$company.name", " >> ", "$name"] },
                },
            },
        ]);

        const trashClients = await Clients.aggregate([
            {
                $match: { orgId, trash: true },
            },
            {
                $project: {
                    _id: 1,
                    type: "client",
                    deletedName: "$name",
                },
            },
        ]);

        const trashSuppliers = await Suppliers.aggregate([
            {
                $match: { orgId, trash: true },
            },
            {
                $project: {
                    _id: 1,
                    type: "supplier",
                    deletedName: "$name",
                },
            },
        ]);

        const data = trashProducts.concat(trashClients, trashSuppliers);

        return json(data);
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
        const text = await getTranslations("products.trash.put");

        const { _id, type } = await req.json();
        if (!_id || !type) return json(text("wrong"), 400);

        if (type === "product") {
            const updated = await Products.updateOne({ _id, trash: true }, { trash: false, trashedAt: null });
            if (!updated.modifiedCount) return json(text("wrong"), 400);
        }

        if (type === "client") {
            const updated = await Clients.updateOne({ _id, trash: true }, { trash: false, trashedAt: null });
            if (!updated.modifiedCount) return json(text("wrong"), 400);
        }

        if (type === "supplier") {
            const updated = await Suppliers.updateOne({ _id, trash: true }, { trash: false, trashedAt: null });
            if (!updated.modifiedCount) return json(text("wrong"), 400);
        }

        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
