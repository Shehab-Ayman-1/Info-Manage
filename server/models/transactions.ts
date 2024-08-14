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

schema.statics.getLockerMoney = async function (orgId: string) {
    const Transactions = this;

    const [amount] = await Transactions.aggregate([
        { $match: { orgId, method: "cash" } },
        {
            $group: {
                _id: null,
                deposits: {
                    $sum: {
                        $cond: [{ $eq: ["$process", "deposit"] }, "$price", 0],
                    },
                },
                withdraws: {
                    $sum: {
                        $cond: [{ $eq: ["$process", "withdraw"] }, "$price", 0],
                    },
                },
            },
        },
    ]);

    const withdraws = amount?.withdraws || 0;
    const deposits = amount?.deposits || 0;

    return { withdraws, deposits, currentAmount: deposits - withdraws };
};

type TransactionsModel = Model<Tranasction> & {
    getLockerMoney: (orgId: string) => Promise<{ deposits: number; withdraws: number; currentAmount: number }>;
};

export const Transactions = (models.transactions as TransactionsModel) || model("transactions", schema);
export type TransactionType = InferSchemaType<typeof schema>;
