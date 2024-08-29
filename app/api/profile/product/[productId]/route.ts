import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { Companies, Products } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { editSchema } from "./schema";
import { json } from "@/utils/response";

type ResponseType = {
    params: { productId: string };
};

export const GET = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const productId = res.params.productId;

        const product = await Products.findById(productId)
            .populate({
                path: "company",
                select: ["_id", "name", "image"],
            })
            .select(["-market.updatedAt", "-__v"]);

        if (!product) return json("This Product Was Not Found.", 400);
        return json(product);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const PUT = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const productId = res.params.productId;

        const body = await req.json();
        const { name, barcode, purchasePrice, salePrice, marketCount, storeCount, companyId, company, image } =
            editSchema.parse(body);

        await Companies.updateOne({ _id: companyId }, { name: company, image });

        await Products.updateOne(
            { _id: productId },
            {
                name,
                barcode,
                market: { price: purchasePrice, count: marketCount },
                store: { price: salePrice, count: storeCount },
            },
        );

        return json("The Product Was Successfully Updated.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const DELETE = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const productId = res.params.productId;
        const deleted = await Products.deleteOne({ _id: productId });

        if (!deleted.deletedCount) return json("The Products Was Not Deleted.", 400);
        return json("The Product Was Successfully Deleted,");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
