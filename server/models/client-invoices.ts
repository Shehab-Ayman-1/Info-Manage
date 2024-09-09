import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TClientInvoice = Document & {
    _id: string;
    orgId: string;

    client: any;
    barcode: number;

    state: "completed" | "pending" | "refund" | "payment";
    type: "sale" | "refund" | "payment";

    discount: number;
    paid: number;
    total: number;

    expireAt: Date;
    createdAt: Date;

    products: {
        _id: string;
        productId: any;
        count: number;
        soldPrice: number;
        purchasePrice: number;
    }[];
};

const schema = new Schema<TClientInvoice>({
    orgId: { type: String, required: true, trim: true },

    client: { type: Schema.Types.ObjectId, ref: "clients", required: true },
    barcode: { type: Number, default: Date.now() },

    state: { type: String, required: true, trim: true, enum: ["completed", "pending", "refund", "payment"] },
    type: { type: String, required: true, trim: true, enum: ["sale", "refund", "payment"], default: "sale" },

    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },

    expireAt: { type: Date, required: true, default: Date.now() + 1000 * 60 * 60 * 24 * 365 },
    createdAt: { type: Date, default: new Date() },

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

export const ClientInvoices =
    (models.client_invoices as Model<TClientInvoice>) || model<TClientInvoice>("client_invoices", schema);
export type ClientInvoiceType = InferSchemaType<typeof schema>;
