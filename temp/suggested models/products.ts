import { model, Schema, InferSchemaType } from "mongoose";

const details = new Schema({
	price: { type: Number, required: true },
	count: { type: Number, required: true },
	updatedAt: { type: Date, required: true, default: Date.now() },
});

const schema = new Schema({
	companyId: { type: String, required: true, trim: true },

	name: { type: String, required: true, trim: true },
	barcode: { type: String, trim: true },
	suppliers: { type: [String], required: true, trim: true },

	min: { type: Number, required: true, default: 5 },
	max: { type: Number, required: true, default: 15 },

	store: {
		price: { type: Number, required: true },
		count: { type: Number, required: true },
		updatedAt: { type: Date, required: true, default: Date.now() },
	},

	market: {
		price: { type: Number, required: true },
		count: { type: Number, required: true },
		updatedAt: { type: Date, required: true, default: Date.now() },
	},
});

export const Products = model("products", schema);
export type ProductType = InferSchemaType<typeof schema> & { _id: String };
