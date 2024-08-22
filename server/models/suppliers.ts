import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TSupplier = Document & {
    _id: string;
    orgId: string;
    name: string;
    phone: string;
    products: string[];
    pendingCosts: number;
};

const schema = new Schema<TSupplier>({
    orgId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    pendingCosts: { type: Number, default: 0 },
    products: [{ type: Schema.Types.ObjectId, ref: "products", required: true }],
});

export const Suppliers = (models.suppliers as Model<TSupplier>) || model("suppliers", schema);
export type SupplierType = InferSchemaType<typeof schema>;
