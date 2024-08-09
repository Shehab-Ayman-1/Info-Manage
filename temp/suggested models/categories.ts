import { model, Schema, InferSchemaType } from "mongoose";

const schema = new Schema({
	orgId: { type: String, required: true },
	name: { type: String, required: true },
});

export const Categories = model("categories", schema);
export type CategoryType = InferSchemaType<typeof schema> & { _id: String };
