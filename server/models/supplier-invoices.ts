import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TSupplierInvoice = Document & {
    _id: string;
    orgId: string;

    supplier: any;
    barcode: number;

    state: "completed" | "pending" | "refund";
    type: "purchase" | "refund";

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

const schema = new Schema<TSupplierInvoice>({
    orgId: { type: String, required: true, trim: true },

    supplier: { type: Schema.Types.ObjectId, ref: "suppliers", required: true },
    barcode: { type: Number, required: true, default: Date.now() },

    state: { type: String, required: true, trim: true, enum: ["completed", "pending", "refund"] },
    type: { type: String, required: true, trim: true, enum: ["purchase", "refund"], default: "purchase" },

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

export const SupplierInvoices =
    (models.supplier_invoices as Model<TSupplierInvoice>) || model<TSupplierInvoice>("supplier_invoices", schema);
export type SupplierInvoiceType = InferSchemaType<typeof schema>;
