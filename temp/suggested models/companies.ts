import { InferSchemaType, model, Schema } from "mongoose";

const schema = new Schema({
	categoryId: { type: String, required: true },
	image: { type: String, required: true, trim: true },
	name: { type: String, required: true, trim: true },
});

export const Companies = model("companies", schema);
export type CompanyType = InferSchemaType<typeof schema> & { _id: String };
