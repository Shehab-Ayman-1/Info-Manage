import { models, model, Schema, Model, InferSchemaType } from "mongoose";

type TStatistics = {
    orgId: string;
};

const schema = new Schema<TStatistics>({
    orgId: { type: String, required: true, trim: true },
});

export const Statistics = (models.statistics as Model<TStatistics>) || model<TStatistics>("statistics", schema);

export type StatisticsType = InferSchemaType<typeof schema>;
