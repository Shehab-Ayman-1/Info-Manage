import { auth } from "@clerk/nextjs/server";
import { Document, Model, InferSchemaType, Schema, models, model } from "mongoose";

type Tranasction = Document & {
    _id: string;
    orgId: string;
    total: number;
    method: "cash" | "visa";
    process: "withdraw" | "deposit";
    history: {
        _id: string;
        creator: string;
        reason: string;
        price: number;
        createdAt: Date;
    }[];
};

const schema = new Schema<Tranasction>({
    orgId: { type: String, required: true, trim: true },
    method: { type: String, required: true, trim: true, enum: ["cash", "visa"] },
    process: { type: String, required: true, trim: true, enum: ["withdraw", "deposit"] },
    total: { type: Number, required: true, default: 0 },
    history: [
        {
            creator: { type: String, required: true, trim: true },
            reason: { type: String, required: true, trim: true },
            price: { type: Number, required: true, default: 0 },
            createdAt: { type: Date, required: true, trim: true, default: new Date() },
        },
    ],
});

schema.statics.getLockerCash = async function (orgId: string) {
    const Transactions = this;

    const cashes = await Transactions.aggregate([
        {
            $match: { orgId },
        },
        {
            $unwind: "$history",
        },
        {
            $group: {
                _id: { method: "$method", process: "$process" },
                price: { $sum: "$history.price" },
            },
        },
        {
            $project: {
                _id: 0,
                method: "$_id.method",
                process: "$_id.process",
                price: "$price",
            },
        },
    ]);

    const cashDeposit = cashes.find((cash) => cash.method === "cash" && cash.process === "deposit");
    const visaDeposit = cashes.find((cash) => cash.method === "visa" && cash.process === "deposit");
    const cashWithdraw = cashes.find((cash) => cash.method === "cash" && cash.process === "withdraw");
    const visaWithdraw = cashes.find((cash) => cash.method === "visa" && cash.process === "withdraw");

    const data = {
        lockerCash: (cashDeposit?.price || 0) - (cashWithdraw?.price || 0),
        lockerVisa: (visaDeposit?.price || 0) - (visaWithdraw?.price || 0),
    };

    return data;
};

schema.pre("updateOne", async function (next) {
    const { userId, orgId } = auth();
    if (!userId || !orgId) return next(new Error("Org ID OR User ID Is Not Defined."));

    const Transactions = this.model;
    const transactions = await Transactions.countDocuments({ orgId });

    if (!transactions)
        await Transactions.create([
            { orgId, method: "cash", process: "withdraw", total: 0, history: [] },
            { orgId, method: "visa", process: "withdraw", total: 0, history: [] },
            { orgId, method: "cash", process: "deposit", total: 0, history: [] },
            { orgId, method: "visa", process: "deposit", total: 0, history: [] },
        ]);

    next();
});

type TransactionsModel = Model<Tranasction> & {
    getLockerCash: (orgId: string) => Promise<{ lockerCash: number; lockerVisa: number }>;
};

export const Transactions = (models.transactions as TransactionsModel) || model("transactions", schema);
export type TransactionType = InferSchemaType<typeof schema>;
