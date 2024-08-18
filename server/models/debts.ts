import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TDebt = Document & {
    _id: string;
    orgId: string;

    supplier: any;
    state: "completed" | "pending";

    paid: number;
    total: number;

    createdAt: Date;
    expireAt: Date;

    products: {
        name: string;
        count: number;
        purchasePrice: number;
    }[];
};

const schema = new Schema<TDebt>({
    orgId: { type: String, required: true, trim: true },

    supplier: { type: Schema.Types.ObjectId, ref: "suppliers", required: true },
    state: { type: String, required: true, enum: ["completed", "pending"] },

    paid: { type: Number, default: 0 },
    total: { type: Number, default: 0 },

    createdAt: { type: Date, default: new Date() },
    expireAt: { type: Date, required: true, default: Date.now() + 1000 * 60 * 60 * 24 * 365 },

    products: [
        {
            name: { type: String, required: true, trim: true },
            count: { type: Number, default: 0 },
            price: { type: Number, default: 0 },
        },
    ],
});

schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const Debts = (models.debts as Model<TDebt>) || model<TDebt>("debts", schema);
export type DebtType = InferSchemaType<typeof schema>;
