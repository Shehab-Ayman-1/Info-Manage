import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { Suppliers } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

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
