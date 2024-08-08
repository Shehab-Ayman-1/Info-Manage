import { Schema, model, models, InferSchemaType, Model } from "mongoose";

type TProduct = {
    _id: string;
    name: string;
    barcode: string;
    min: number;
    max: number;
    market: { price: number; count: number; updatedAt: Date };
    store: { price: number; count: number; updatedAt: Date };
    company: any;
};

const schema = new Schema<TProduct>({
    name: { type: String, required: true, trim: true },
    barcode: { type: String, trim: true },

    min: { type: Number, required: true },
    max: { type: Number, required: true },

    market: {
        price: { type: Number, required: true },
        count: { type: Number, required: true },
        updatedAt: { type: Date, default: Date.now() },
    },

    store: {
        price: { type: Number, required: true },
        count: { type: Number, required: true },
    },

    company: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
    },
});

export const Products = (models.products as Model<TProduct>) || model<TProduct>("products", schema);
export type ProductType = InferSchemaType<typeof schema>;
