import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

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
            { $match: { orgId } },
            {
                $lookup: {
                    from: "products",
                    as: "products",
                    localField: "products",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: {
                    from: "companies",
                    as: "company",
                    localField: "products.company",
                    foreignField: "_id",
                },
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
                            name: "$products.name",
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

        const body = await req.json();
        const { supplierId, name, phone } = editSchema.parse(body);

        const updated = await Suppliers.updateOne({ orgId, _id: supplierId }, { name, phone });
        if (!updated.modifiedCount) return json("Something Went Wrong.", 400);

        return json("The Supplier Was Successfully Updated.");
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

        const { supplierId } = await req.json();
        if (!supplierId) return json("Something Went Wrong.", 400);

        const deleted = await Suppliers.deleteOne({ orgId, _id: supplierId });
        if (!deleted.deletedCount) return json("Something Went Wrong.", 400);

        return json("The Supplier Was Successfully Deleted.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
