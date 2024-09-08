import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { getTranslations } from "@/utils/getTranslations";
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
        const text = await getTranslations("profile.product.get");

        const productId = res.params.productId;

        const product = await Products.findById(productId)
            .populate({ path: "company", select: ["_id", "name", "image"] })
            .select(["-market.updatedAt", "-__v"]);

        if (!product) return json(text("not-found"), 400);
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
        const text = await getTranslations("profile.product.put");

        const productId = res.params.productId;

        const body = await req.json();
        const { name, barcode, purchasePrice, salePrice, marketCount, storeCount, companyId, company, image } =
            editSchema.parse(body);

        await Companies.updateOne({ _id: companyId }, { name: company, image });

        await Products.updateOne(
            { _id: productId, trash: false },
            {
                name,
                barcode,
                market: { price: purchasePrice, count: marketCount },
                store: { price: salePrice, count: storeCount },
            },
        );

        return json(text("success"));
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
        const text = await getTranslations("profile.product.delete");

        const productId = res.params.productId;
        const updateProduct = await Products.updateOne(
            { _id: productId, trash: false },
            { trash: true, trashedAt: Date.now() + 1000 * 60 * 60 * 24 * 90 },
        );

        if (!updateProduct?.modifiedCount) return json(text("not-deleted"), 400);
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
