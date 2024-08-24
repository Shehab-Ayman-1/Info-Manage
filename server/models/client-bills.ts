import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TClientBill = Document & {
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
        productId: any;
        count: number;
        soldPrice: number;
        purchasePrice: number;
    }[];
};

const schema = new Schema<TClientBill>({
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
            productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
            count: { type: Number, required: true },
            soldPrice: { type: Number, required: true },
            purchasePrice: { type: Number, required: true },
        },
    ],
});

schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const ClientBills = (models.client_bills as Model<TClientBill>) || model<TClientBill>("client_bills", schema);
export type ClientBillType = InferSchemaType<typeof schema>;
