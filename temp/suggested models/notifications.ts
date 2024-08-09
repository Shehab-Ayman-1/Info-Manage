import { InferSchemaType, model, Schema } from "mongoose";

const schema = new Schema({
	title: { type: String, required: true, trim: true },
	description: { type: String, required: true, trim: true },
	createdAt: { type: String, required: true, trim: true },
	icon: { type: String, required: true, trim: true }, // fontAwasome Class
	method: { type: String, required: true, trim: true, enum: ["create", "withdraw", "deposit"] },
});

export const Notifications = model("notifications", schema);
export type NotificationType = InferSchemaType<typeof schema>;
