import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";
import { Bills } from "@/server/models";
import { months } from "@/constants";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const year = new Date().getFullYear();
        const thisYear = new Date(`${year}-1-1`);
        const nextYear = new Date(`${year + 1}-1-1`);

        const byYear = await Bills.aggregate([
            {
                $match: { orgId, createdAt: { $gte: thisYear, $lt: nextYear } },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    soldPrices: {
                        $sum: { $multiply: ["$products.soldPrice", "$products.count"] },
                    },
                    boughtPrices: {
                        $sum: { $multiply: ["$products.boughtPrice", "$products.count"] },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: { $arrayElemAt: [months, { $subtract: ["$_id", 1] }] },
                    chart_1: { $subtract: ["$soldPrices", "$boughtPrices"] },
                },
            },
        ]);

        const month = new Date().getMonth() + 1;
        const thisMonth = new Date(`${year}-${month}-1`);
        const nextMonth = new Date(`${year}-${month + 1}-1`);

        const byMonth = await Bills.aggregate([
            {
                $match: { orgId, createdAt: { $gte: thisMonth, $lt: nextMonth } },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$createdAt" },
                    soldPrices: {
                        $sum: { $multiply: ["$products.soldPrice", "$products.count"] },
                    },
                    boughtPrices: {
                        $sum: { $multiply: ["$products.boughtPrice", "$products.count"] },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    day: "$_id",
                    chart_2: { $subtract: ["$soldPrices", "$boughtPrices"] },
                },
            },
        ]);

        return json([{ year: byYear, month: byMonth }]);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
