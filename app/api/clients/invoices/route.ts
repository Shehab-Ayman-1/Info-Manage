import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { ClientInvoices } from "@/server/models";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const from = searchParams.get("startDate")!;
        const to = searchParams.get("endDate")!;

        const startDate = new Date(from);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(to);
        endDate.setHours(23, 59, 59, 999);

        const invoices = await ClientInvoices.aggregate([
            {
                $match: { orgId, createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                $lookup: { from: "clients", as: "client", localField: "client", foreignField: "_id" },
            },
            {
                $unwind: "$client",
            },
            {
                $project: {
                    _id: 1,
                    total: 1,
                    paid: 1,
                    state: 1,
                    discount: 1,
                    createdAt: 1,
                    client: "$client.name",
                    pending: { $subtract: ["$total", "$paid"] },
                },
            },
            {
                $sort: { createdAt: -1 },
            },
        ]);

        return json(invoices);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
