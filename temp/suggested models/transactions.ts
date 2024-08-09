import { InferSchemaType, model, Schema } from "mongoose";

// The bought and sales transations
const schema = new Schema({
	orgId: { type: String, required: true, trim: true },

	userId: { type: String, required: true, trim: true },
	username: { type: String, required: true, trim: true },
	userImage: { type: String, required: true, trim: true },

	title: { type: String, required: true, trim: true },
	price: { type: Number, required: true },
	method: { type: String, required: true, enum: ["cash", "visa"] },
	process: { type: String, required: true, trim: true, enum: ["withdraw", "deposit"] },

	createdAt: { type: Date, required: true, default: Date.now() },
});

export const Transactions = model("transactions", schema);
export type TransactionType = InferSchemaType<typeof schema> & { _id: String };
