import { InferSchemaType, Schema, model } from "mongoose";

const schema = new Schema({
	userId: { type: String, required: true, trim: true },
	orgId: { type: String, required: true, trim: true }, // Created by admin. To let the editor or user access the other collections
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, trim: true },
	phone: { type: Number, required: true, trim: true },
	role: { type: String, enum: ["admin", "editor", "user"] },
});

export const Users = model("users", schema);
export type UserType = InferSchemaType<typeof schema> & { _id: String };
