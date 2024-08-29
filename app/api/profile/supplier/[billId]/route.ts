import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

import { SupplierBills, Suppliers, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

type ResponseType = {
    params: { billId: string };
};

export const GET = async (req: NextRequest, res: ResponseType) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { billId } = res.params;
        const [bill] = await SupplierBills.aggregate([
            {
                $match: { orgId, _id: new Types.ObjectId(billId) },
            },
            {
                $lookup: { from: "suppliers", localField: "supplier", foreignField: "_id", as: "supplier" },
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

        return json(bill);
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
        const { billId } = res.params;

        const bill = await SupplierBills.findById(billId);
        if (!bill) return json("Something Went Wrong", 400);
        if (bill.state === "completed") return json("This Bill Is Already Finished", 400);

        // Check If The Amount In The Locker Cash
        const { lockerCash } = await Transactions.getLockerCash(orgId);
        if (amount > lockerCash) return json("This Amount Doesn't Exist In The Locker.", 400);

        // Update The Supplier Bill Salaries
        if (amount > bill.total - bill.paid) return json("The Payment Amount Is Greater Than The Pending Amount.", 400);
        await SupplierBills.updateOne(
            { orgId, _id: billId },
            { $inc: { paid: amount }, state: bill.paid + amount >= bill.total ? "completed" : "pending" },
        );

        // Update The Supplier Salaries
        await Suppliers.updateOne({ orgId, _id: bill.supplier }, { $inc: { pendingCosts: -amount } });

        // Create Transaction
        await Transactions.create({
            orgId,
            price: amount,
            creator: user.fullName,
            reason: "Supplier Bill Payment",
            process: "withdraw",
            method: "cash",
            createdAt: new Date(),
        });

        return json("The Payment Was Successfully Done.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
