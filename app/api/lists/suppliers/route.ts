import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Suppliers } from "@/server/models";
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
                $lookup: { from: "companies", as: "products.company", localField: "products.company", foreignField: "_id" },
            },
            {
                $unwind: "$products.company",
            },
            {
                $match: { "products.trash": false },
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    products: {
                        $addToSet: {
                            _id: "$products._id",
                            name: "$products.name",
                            purchasePrice: "$products.store.price",
                            soldPrice: "$products.market.price",
                            company: {
                                _id: "$products.company._id",
                                name: "$products.company.name",
                            },
                        },
                    },
                },
            },
        ]);

        const unknown = suppliers.some((supplier) => supplier.name === "unknown");
        if (!unknown) {
            const supplier = await Suppliers.create({ orgId, name: "unknown", phone: "01234567890", products: [] });
            suppliers.push(supplier);
        }

        return json(suppliers);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
