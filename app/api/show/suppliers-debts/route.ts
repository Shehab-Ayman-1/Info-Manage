import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { Debts, Products, ProductType, Suppliers, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const debts = await Debts.aggregate([
            {
                $match: { orgId },
            },
            {
                $lookup: {
                    from: "suppliers",
                    as: "suppliers",
                    localField: "supplier",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$suppliers",
            },
            {
                $project: {
                    _id: 1,
                    supplier: "$suppliers.name",

                    total: 1,
                    paid: 1,
                    state: 1,

                    pending: { $subtract: ["$total", "$paid"] },
                    created_At: "$createdAt",
                },
            },
        ]);

        return json(debts);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);
        if (!user) return json("Something Went Wrong", 400);

        const { debtId } = await req.json();
        if (!debtId) return json("Something Went Wrong.", 400);

        const debt = await Debts.findById(debtId);
        if (!debt) return json("Something Went Wrong.", 400);

        // Return The Products To The Store From Supplier Ref
        await Promise.all([
            debt.products.map(async ({ name, count }) => {
                const supplier = await Suppliers.findOne({ orgId, _id: debt.supplier }).populate({
                    path: "products",
                    match: { name },
                    justOne: true,
                });
                const productId = (supplier?.products as any)._id;
                await Products.updateOne({ _id: productId }, { $inc: { "store.count": -count } });
            }),
        ]);

        // Decreament The Supplier pendingCosts
        if (debt.total - debt.paid > 0)
            await Suppliers.updateOne({ orgId, _id: debt.supplier }, { $inc: { pendingCosts: -(debt.total - debt.paid) } });

        // Delete The Debt
        const deleted = await Debts.deleteOne({ orgId, _id: debtId });
        if (!deleted.deletedCount) return json("Something Went Wrong.", 400);

        // Create New Transaction
        await Transactions.create({
            orgId,
            reason: "Canceled Supplier Bill",
            process: "deposit",
            method: "cash",
            price: debt.paid,
            creator: user.fullName,
        });

        // Response
        return json("The Product Was Deleted Successfully.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
