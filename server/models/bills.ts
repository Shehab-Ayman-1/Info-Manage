import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TBill = Document & {
    _id: string;
    orgId: string;

    client: any;
    state: "completed" | "pending";

    paid: number;
    total: number;
    discount: number;

    createdAt: Date;
    expireAt: Date;

    products: {
        _id: string;
        companyId: any;
        name: string;
        count: number;
        soldPrice: number;
        purchasePrice: number;
    }[];
};

const schema = new Schema<TBill>({
    orgId: { type: String, required: true, trim: true },

    client: { type: Schema.Types.ObjectId, ref: "clients", required: true },
    state: { type: String, required: true, trim: true, enum: ["completed", "pending"] },

    paid: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },

    createdAt: { type: Date, default: new Date() },
    expireAt: { type: Date, required: true, default: Date.now() + 1000 * 60 * 60 * 24 * 365 },

    products: [
        {
            companyId: { type: Schema.Types.ObjectId, required: true, ref: "companies" },
            name: { type: String, required: true, trim: true },
            count: { type: Number, required: true },
            soldPrice: { type: Number, required: true },
            purchasePrice: { type: Number, required: true },
        },
    ],
});

schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const Bills = (models.bills as Model<TBill>) || model<TBill>("bills", schema);
export type BillType = InferSchemaType<typeof schema>;
