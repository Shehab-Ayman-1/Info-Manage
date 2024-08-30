import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { SupplierBills, Products, Suppliers, Transactions } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { json } from "@/utils/response";

export const GET = async (req: NextRequest) => {
    try {
        await DBConnection();

        const { userId, orgId } = auth();
        if (!userId || !orgId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date")!;

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const supplierBills = await SupplierBills.aggregate([
            {
                $match: { orgId, createdAt: { $gte: startDate, $lte: endDate } },
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

        return json(supplierBills);
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

        const { billId } = await req.json();
        if (!billId) return json("Something Went Wrong.", 400);

        const bill = await SupplierBills.findById(billId);
        if (!bill) return json("Something Went Wrong.", 400);

        // Return The Products To The Store From Supplier Ref
        await Promise.all([
            bill.products.map(async ({ name, count }) => {
                const supplier = await Suppliers.findOne({ orgId, _id: bill.supplier }).populate({
                    path: "products",
                    match: { name },
                    justOne: true,
                });
                const productId = (supplier?.products as any)._id;
                await Products.updateOne({ _id: productId }, { $inc: { "store.count": -count } });
            }),
        ]);

        // Decreament The Supplier pending
        if (bill.total - bill.paid > 0)
            await Suppliers.updateOne({ orgId, _id: bill.supplier }, { $inc: { pending: -(bill.total - bill.paid) } });

        // Delete The Supplier Bill
        const deleted = await SupplierBills.deleteOne({ orgId, _id: billId });
        if (!deleted.deletedCount) return json("Something Went Wrong.", 400);

        // Create New Transaction
        await Transactions.updateOne(
            {
                orgId,
                method: "cash",
                process: "deposit",
            },
            {
                $inc: { total: bill.paid },
                $push: {
                    history: {
                        $slice: -20,
                        $each: [
                            {
                                reason: "Canceled Supplier Bill",
                                creator: user.fullName,
                                price: bill.paid,
                                createdAt: new Date(),
                            },
                        ],
                    },
                },
            },
        );

        // Response
        return json("The Product Was Deleted Successfully.");
    } catch (error: any) {
        const errors = error?.issues?.map((issue: any) => issue.message).join(" | ");
        return json(errors || error.message, 400);
    }
};
