import { InferSchemaType, Model, Schema, model, models } from "mongoose";

type TDebt = {
    orgId: string;
    supplier: any;
    createdAt: Date;

    paid: number;
    total: number;
    state: "completed" | "pending";

    products: {
        name: string;
        count: number;
        boughtPrice: number;
    }[];
};

const schema = new Schema<TDebt>({
    orgId: { type: String, required: true, trim: true },
    supplier: { type: Schema.Types.ObjectId, ref: "suppliers", required: true },

    paid: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    state: { type: String, required: true, enum: ["completed", "pending"] },

    products: [
        {
            name: { type: String, required: true, trim: true },
            count: { type: Number, default: 0 },
            price: { type: Number, default: 0 },
        },
    ],

    createdAt: { type: Date, default: Date.now() },
});

export const Debts = (models.debts as Model<TDebt>) || model<TDebt>("debts", schema);
export type DebtType = InferSchemaType<typeof schema>;
