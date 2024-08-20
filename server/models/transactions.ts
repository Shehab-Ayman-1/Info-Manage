import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type Tranasction = Document & {
    _id: string;
    orgId: string;
    creator: string;

    reason: string;
    price: number;
    method: "cash" | "visa";
    process: "withdraw" | "deposit";

    createdAt: Date;
};

const schema = new Schema<Tranasction>({
    orgId: { type: String, required: true, trim: true },
    creator: { type: String, required: true, trim: true },

    reason: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0 },
    method: { type: String, required: true, trim: true, enum: ["cash", "visa"] },
    process: { type: String, required: true, trim: true, enum: ["withdraw", "deposit"] },

    createdAt: { type: Date, required: true, trim: true, default: Date.now() },
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
        lockerCash: cashDeposit?.price - cashWithdraw?.price || 0,
        lockerVisa: visaDeposit?.price - visaWithdraw?.price || 0,
    };

    return data;
};

type TransactionsModel = Model<Tranasction> & {
    getLockerCash: (orgId: string) => Promise<{ lockerCash: number; lockerVisa: number }>;
};

export const Transactions = (models.transactions as TransactionsModel) || model("transactions", schema);
export type TransactionType = InferSchemaType<typeof schema>;
