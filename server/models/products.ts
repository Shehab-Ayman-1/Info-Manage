import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TProduct = Document & {
    _id: string;

    company: any;
    name: string;

    barcode: string;
    unit: "packet" | "liter" | "kilo";

    trash: boolean;
    min: number;

    market: { price: number; count: number; updatedAt: Date };
    store: { price: number; count: number };
};

const schema = new Schema<TProduct>({
    company: { type: Schema.Types.ObjectId, ref: "companies", required: true },
    name: { type: String, required: true, trim: true },

    barcode: { type: String, trim: true },
    unit: { type: String, required: true, trim: true, enum: ["packet", "liter", "kilo"] },

    trash: { type: Boolean, default: false },
    min: { type: Number, required: true },

    market: {
        price: { type: Number, required: true },
        count: { type: Number, required: true },
        updatedAt: { type: Date, default: new Date() },
    },

    store: {
        price: { type: Number, required: true },
        count: { type: Number, required: true },
    },
});

export const Products = (models.products as Model<TProduct>) || model<TProduct>("products", schema);
export type ProductType = InferSchemaType<typeof schema>;
