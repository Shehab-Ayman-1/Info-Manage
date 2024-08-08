import { Schema, model, models, InferSchemaType, Model } from "mongoose";

type TCategory = {
    _id: string;
    orgId: string;
    name: string;
};

const schema = new Schema<TCategory>({
    orgId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
});

export const Categories = (models.categories as Model<TCategory>) || model<TCategory>("categories", schema);
export type CategoryType = InferSchemaType<typeof schema>;
