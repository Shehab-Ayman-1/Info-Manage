import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TDebt = Document & {
    orgId: string;
    supplier: any;
    createdAt: Date;

    paid: number;
    total: number;
    state: "completed" | "pending";

    products: {
        name: string;
        count: number;
        purchasePrice: number;
    }[];
};

const schema = new Schema<TDebt>({
    orgId: { type: String, required: true, trim: true },
    supplier: { type: Schema.Types.ObjectId, ref: "suppliers", required: true },

    paid: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    state: { type: String, required: true, enum: ["completed", "pending"] },
    createdAt: { type: Date, default: new Date() },

    products: [
        {
            name: { type: String, required: true, trim: true },
            count: { type: Number, default: 0 },
            price: { type: Number, default: 0 },
        },
    ],
});

export const Debts = (models.debts as Model<TDebt>) || model<TDebt>("debts", schema);
export type DebtType = InferSchemaType<typeof schema>;
