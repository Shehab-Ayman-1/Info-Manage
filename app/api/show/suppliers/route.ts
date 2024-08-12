import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { Suppliers } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { editSchema } from "./schema";

export const GET = async (req: NextRequest) => {
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
                $project: {
                    _id: 1,
                    supplier: "$name",
                    phone: "$phone",
                    pending: "$pendingCosts",
                    products: "$products.name",
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
