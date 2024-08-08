import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { createSchema } from "./schema";
import { Transactions } from "@/server/models";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);
        const user = await clerkClient().users.getUser(userId);

        const body = await req.json();
        const data = createSchema.parse(body);

        if (data.process === "withdraw") {
            const locker = await Transactions.getLockerMoney(orgId);
            if (data.price > locker.currentAmount) return json(`The Locker Is Not Exist $${data.price}`);
        }

        await Transactions.create({ ...data, orgId, creator: `${user.firstName} ${user.lastName}` });
        return json("The Transaction Was Successfully Created");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
