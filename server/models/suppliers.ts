import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TSupplier = Document & {
    _id: string;
    orgId: string;

    name: string;
    phone: string;

    products: string[];
    pending: number;

    trash: boolean;
    trashedAt: Date;
};

const schema = new Schema<TSupplier>({
    orgId: { type: String, required: true, trim: true },

    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    products: [{ type: Schema.Types.ObjectId, ref: "products", required: true }],
    pending: { type: Number, default: 0 },

    trash: { type: Boolean, default: false },
    trashedAt: { type: Date, default: null },
});
schema.index({ trashedAt: 1 }, { expireAfterSeconds: 0 });

export const Suppliers = (models.suppliers as Model<TSupplier>) || model<TSupplier>("suppliers", schema);
export type SupplierType = InferSchemaType<typeof schema>;
