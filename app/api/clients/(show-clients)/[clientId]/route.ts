import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

import { ClientInvoices, Clients, Transactions } from "@/server/models";
import { getTranslations } from "@/utils/getTranslations";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

type ResponseType = {
    params: { clientId: string };
};

export const PUT = async (req: NextRequest, res: ResponseType) => {
    const session = await mongoose.startSession();
    
    try {
        await DBConnection();
        session.startTransaction();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);
        const text = await getTranslations("clients.show-clients.put");

        const { clientId } = res.params;
        if (!clientId) return json(text("wrong"), 400);

        const { amount } = await req.json();
        if (!amount) return json(text("wrong"), 400);

        const client = await Clients.findById(clientId).session(session);
        if (!client || amount > client.pending) {
            await session.abortTransaction();
            return json(text("greater-payment-amount"), 400);
        }

        // Update The Client Details
        const updated = await Clients.updateOne(
            { orgId, _id: clientId, trash: false },
            { $inc: { pending: -amount } },
            { session },
        );

        if (!updated.modifiedCount) {
            await session.abortTransaction();
            return json(text("wrong"), 400);
        }

        // Create New Client Invoicement With Payment State
        await ClientInvoices.create(
            [
                {
                    orgId,
                    client: clientId,
                    barcode: Date.now(),
                    state: "payment",
                    type: "payment",
                    discount: 0,
                    total: client.pending,
                    paid: amount,
                    createdAt: new Date(),
                },
            ],
            { session },
        );

        // Make New Transaction
        await Transactions.updateOne(
            {
                orgId,
                method: "cash",
                process: "deposit",
            },
            {
                $inc: { total: amount },
                $push: {
                    history: {
                        $slice: -100,
                        $each: [
                            {
                                creator: user.fullName,
                                reason: "Client Payment",
                                price: amount,
                                createdAt: new Date(),
                            },
                        ],
                    },
                },
            },
            { session },
        );

        await session.commitTransaction();
        return json(text("success"));
    } catch (error: any) {
        await session.abortTransaction();
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    } finally {
        session.endSession();
    }
};
