import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DBConnection } from "@/server/configs";
import { Bills, Debts } from "@/server/models";
import { json } from "@/utils/response";
import { months } from "@/constants";
import { Types } from "mongoose";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { searchParams } = new URL(req.url);
        const productName = searchParams.get("productName");
        const companyId = searchParams.get("companyId")!;

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const year = new Date().getFullYear();
        const thisYear = new Date(`${year}-1-1`);
        const nextYear = new Date(`${year + 1}-1-1`);

        const purchases = await Bills.aggregate([
            {
                $match: {
                    orgId,
                    "products.name": productName,
                    "products.companyId": new Types.ObjectId(companyId),
                    createdAt: { $gte: thisYear, $lt: nextYear },
                },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: "$products.count" },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: { $arrayElemAt: [months, { $subtract: ["$_id", 1] }] },
                    chart_1: "$count",
                },
            },
        ]);

        // TODO: Increase The Match Strength
        const sales = await Debts.aggregate([
            {
                $match: {
                    orgId,
                    "products.name": productName,
                    createdAt: { $gte: thisYear, $lt: nextYear },
                },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: "$products.count" },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: { $arrayElemAt: [months, { $subtract: ["$_id", 1] }] },
                    chart_2: "$count",
                },
            },
        ]);

        return json({ purchases, sales });
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
