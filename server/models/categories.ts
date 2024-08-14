import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TCategory = Document & {
    _id: string;
    orgId: string;
    orgSlug: string;
    name: string;
};

const schema = new Schema<TCategory>({
    orgId: { type: String, required: true, trim: true },
    orgSlug: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
});

export const Categories = (models.categories as Model<TCategory>) || model<TCategory>("categories", schema);
export type CategoryType = InferSchemaType<typeof schema>;
