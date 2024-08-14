import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TClient = Document & {
    _id: string;
    orgId: string;
    name: string;
    phone: string;
    pendingCosts: number;
    products: string[];
};

const schema = new Schema<TClient>({
    orgId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    pendingCosts: { type: Number, default: 0 },
    products: [{ type: Schema.Types.ObjectId, ref: "products", required: true }],
});

export const Suppliers = (models.suppliers as Model<TClient>) || model("suppliers", schema);
export type SupplierType = InferSchemaType<typeof schema>;
