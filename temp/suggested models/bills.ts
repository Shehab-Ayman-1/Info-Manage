import { model, Schema, InferSchemaType } from "mongoose";

const priceSchema = new Schema({
	paid: { type: Number, required: true, default: 0 },
	total: { type: Number, required: true, default: 0 },
	discount: { type: Number, required: true, default: 0 },
	completed: { type: Boolean, required: true, default: true },
});

const productsSchema = new Schema({
	name: { type: String, required: true, trim: true },
	count: { type: Number, required: true },
	price: { type: Number, required: true },
	boughtPrice: { type: Number, required: true },
});

const schema = new Schema({
	client: { type: String, trim: true },
	place: { type: String, trim: true, enum: ["store", "market"] },

	price: { ref: priceSchema },
	products: { ref: productsSchema },

	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: [Date], default: [Date.now()] },
});

export const Bills = model("bills", schema);
export type BillType = InferSchemaType<typeof schema>;
