import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Products } from "@/server/models";
import { editSchema } from "./schema";
import { json } from "@/utils/response";

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const body = await req.json();
        const { productId, place, count } = editSchema.parse(body);

        const product = await Products.findById(productId);
        if (!product) return json("The Product Was Not Found.", 400);

        const otherPlace = place === "market" ? "store" : "market";
        if (count > product[otherPlace].count) return json(`This Count Is Not Available In The ${otherPlace}.`, 400);

        const updated = await Products.updateOne(
            { _id: productId },
            {
                $inc: {
                    [place === "market" ? "market.count" : "store.count"]: count,
                    [place === "market" ? "store.count" : "market.count"]: -count,
                },
            },
        );
        if (!updated.modifiedCount) return json("The Product Was Not Modified.", 400);

        return json("The Product Was Transfer");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
