import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Products } from "@/server/models";
import { editSchema } from "./schema";
import { json } from "@/utils/response";
import { getTranslations } from "@/utils/getTranslations";

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("products.transfer-product.put");

        const body = await req.json();
        const { productId, place, count } = editSchema.parse(body);

        const product = await Products.findById(productId);
        if (!product) return json(text("not-found"), 400);

        const otherPlace = place === "market" ? "store" : "market";
        if (count > product[otherPlace].count)
            return json(`${text("just-available")} [${product[otherPlace].count}] ${text("in-the")} ${text(otherPlace)}`, 400);

        const updated = await Products.updateOne(
            { _id: productId, trash: false },
            {
                $inc: {
                    [place === "market" ? "market.count" : "store.count"]: count,
                    [place === "market" ? "store.count" : "market.count"]: -count,
                },
            },
        );
        if (!updated.modifiedCount) return json(text("not-modified"), 400);

        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
