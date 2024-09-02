import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Transactions } from "@/server/models";
import { createSchema } from "./schema";
import { json } from "@/utils/response";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const user = await clerkClient().users.getUser(userId);

        const body = await req.json();
        const { reason, method, process, price } = createSchema.parse(body);

        if (process === "withdraw") {
            const { lockerCash } = await Transactions.getLockerCash(orgId);
            if (price > lockerCash) return json(`The Locker Is Not Exist $${price}`, 400);
        }

        await Transactions.updateOne(
            {
                orgId,
                method,
                process,
            },
            {
                $inc: { total: price },
                $push: {
                    history: {
                        $slice: -100,
                        $each: [
                            {
                                creator: user.fullName,
                                reason,
                                price,
                                createdAt: new Date(),
                            },
                        ],
                    },
                },
            },
        );
        return json("The Transaction Was Successfully Created");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
