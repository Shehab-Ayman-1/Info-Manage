import { auth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { ClientBills } from "@/server/models";
import { json } from "@/utils/response";
import { months } from "@/constants";

export const GET = async () => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const year = new Date().getFullYear();
        const thisYear = new Date(`${year}-1-1`);
        const nextYear = new Date(`${year + 1}-1-1`);

        const byYear = await ClientBills.aggregate([
            {
                $match: { orgId, type: "sale", createdAt: { $gte: thisYear, $lt: nextYear } },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$total" },
                },
            },
            {
                $sort: { _id: 1 },
            },
            {
                $project: {
                    _id: 0,
                    month: { $arrayElemAt: [months, { $subtract: ["$_id", 1] }] },
                    chart_1: "$total",
                },
            },
        ]);

        const month = new Date().getMonth() + 1;
        const thisMonth = new Date(`${year}-${month}-1`);
        const nextMonth = new Date(`${year}-${month + 1}-1`);

        const byMonth = await ClientBills.aggregate([
            {
                $match: { orgId, type: "sale", createdAt: { $gte: thisMonth, $lt: nextMonth } },
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$createdAt" },
                    total: { $sum: "$total" },
                },
            },
            {
                $project: {
                    _id: 0,
                    day: "$_id",
                    chart_2: "$total",
                },
            },
            {
                $sort: { day: 1 },
            },
        ]);

        return json({ year: byYear, month: byMonth });
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
