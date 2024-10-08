import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TCompany = Document & {
    _id: string;
    name: string;
    image: string;
    category: any;
};

const schema = new Schema<TCompany>({
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "categories", required: true },
});

export const Companies = (models.companies as Model<TCompany>) || model<TCompany>("companies", schema);
export type CompanyType = InferSchemaType<typeof schema>;
