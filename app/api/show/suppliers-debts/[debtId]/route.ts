import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { DBConnection } from "@/server/configs";
import { Bills, Clients, Debts, Suppliers, Transactions } from "@/server/models";
import { json } from "@/utils/response";

type ResponseType = {
    params: { debtId: string };
};

export const GET = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { debtId } = res.params;
        const debt = await Debts.aggregate([
            {
                $match: { orgId, _id: new Types.ObjectId(debtId) },
            },
            {
                $lookup: {
                    from: "suppliers",
                    localField: "supplier",
                    foreignField: "_id",
                    as: "supplier",
                },
            },
            {
                $unwind: "$supplier",
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$_id",
                    supplier: { $first: "$supplier.name" },
                    paid: { $first: "$paid" },
                    total: { $first: "$total" },
                    discount: { $first: "$discount" },
                    state: { $first: "$state" },
                    createdAt: { $first: "$createdAt" },
                    products: {
                        $push: {
                            product: "$products.name",
                            count: "$products.count",
                            price: "$products.price",
                            total: { $multiply: ["$products.count", "$products.price"] },
                        },
                    },
                },
            },
        ]);

        return json(debt);
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};

export const PUT = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const user = await clerkClient().users.getUser(userId);

        const { amount } = await req.json();
        const { debtId } = res.params;

        const debt = await Debts.findById(debtId);
        if (!debt) return json("Something Went Wrong", 400);
        if (debt.state === "completed") return json("This Bill Is Already Finished", 400);

        // Check If The Amount In The Locker Cash
        const lockerCash = await Transactions.getLockerMoney(orgId);
        if (amount > lockerCash.currentAmount) return json("This Amount Doesn't Exist In The Locker.", 400);

        // Update The Debt Salaries
        if (amount > debt.total - debt.paid) return json("The Payment Amount Is Greater Than The Pending Amount.", 400);
        await Debts.updateOne(
            { orgId, _id: debtId },
            { $inc: { paid: amount }, state: debt.paid + amount >= debt.total ? "completed" : "pending" },
        );

        // Update The Supplier Salaries
        await Suppliers.updateOne({ orgId, _id: debt.supplier }, { $inc: { pendingCosts: -amount } });

        // Create Transaction
        await Transactions.create({
            orgId,
            price: amount,
            creator: user.fullName,
            reason: "Supplier Bill Payment",
            process: "withdraw",
            method: "cash",
        });

        return json("The Payment Was Successfully Done.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
