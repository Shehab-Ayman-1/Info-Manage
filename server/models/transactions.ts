import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type Tranasction = Document & {
    _id: string;
    orgId: string;
    creator: string;
    total: number;
    method: "cash" | "visa";
    process: "withdraw" | "deposit";
    history: {
        _id: string;
        reason: string;
        price: number;
        createdAt: Date;
    }[];
};

const schema = new Schema<Tranasction>({
    orgId: { type: String, required: true, trim: true },
    creator: { type: String, required: true, trim: true },
    method: { type: String, required: true, trim: true, enum: ["cash", "visa"] },
    process: { type: String, required: true, trim: true, enum: ["withdraw", "deposit"] },
    total: { type: Number, required: true, default: 0 },
    history: [
        {
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
            $group: {
                _id: { method: "$method", process: "$process" },
                price: { $sum: "$price" },
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

type TransactionsModel = Model<Tranasction> & {
    getLockerCash: (orgId: string) => Promise<{ lockerCash: number; lockerVisa: number }>;
};

export const Transactions = (models.transactions as TransactionsModel) || model("transactions", schema);
export type TransactionType = InferSchemaType<typeof schema>;
