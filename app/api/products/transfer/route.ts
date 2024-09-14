import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { Products } from "@/server/models";
import { editSchema } from "./schema";
import { json } from "@/utils/response";

export const PUT = async (req: NextRequest) => {
    const session = await mongoose.startSession();

    try {
        await DBConnection();
        session.startTransaction();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const text = await getTranslations("products.transfer-products.put");

        const body = await req.json();
        const { products, place } = editSchema.parse(body);

        const promises = await Promise.all(
            products.map(async ({ _id, count }) => {
                const product = await Products.findById(_id).session(session);
                if (!product) return { notFound: true };

                const otherPlace = place === "market" ? "store" : "market";
                if (count > product[otherPlace].count) {
                    const message = `${text("just-available")} [${product[otherPlace].count}] ${text("in-the")} ${text(otherPlace)} ${text("of")} ${product.name}`;
                    return { notEnough: true, message };
                }

                const updated = await Products.updateOne(
                    { _id, trash: false },
                    {
                        $inc: {
                            [place === "market" ? "market.count" : "store.count"]: count,
                            [place === "market" ? "store.count" : "market.count"]: -count,
                        },
                    },
                    { session },
                );

                if (!updated.modifiedCount) return { notModified: true };
            }),
        );

        const notFound = promises.filter((promise: any) => promise?.notFound);
        if (notFound.length) {
            await session.abortTransaction();
            return json(text("not-found"), 400);
        }

        const notEnough = promises.filter((promise: any) => promise?.notEnough);
        if (notEnough.length) {
            await session.abortTransaction();
            const messages = notEnough.map((product) => product?.message);
            return json(messages.join(" | "), 400);
        }

        const notModified = promises.filter((promise: any) => promise?.notModified);
        if (notModified.length) {
            await session.abortTransaction();
            return json(text("not-modified"), 400);
        }

        await session.commitTransaction();
        return json(text("success"));
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
