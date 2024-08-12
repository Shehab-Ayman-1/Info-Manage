import { Schema, models, model, Model, InferSchemaType } from "mongoose";

type TClient = {
    _id: string;
    orgId: string;
    name: string;
    level: "bronze" | "silver" | "gold";
    bronzeTo: number;
    silverTo: number;
    discounts: number;
    boughtsSalary: number;
    pendingCosts: number;
};

const schema = new Schema<TClient>({
    orgId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },

    level: { type: String, enum: ["bronze", "silver", "gold"], default: "bronze" },
    bronzeTo: { type: Number, required: true },
    silverTo: { type: Number, required: true },

    discounts: { type: Number, default: 0 },
    boughtsSalary: { type: Number, default: 0 },
    pendingCosts: { type: Number, default: 0 },
});

type FilterQuery = {
    orgId: string;
    clientId: string;
};

schema.statics.updateLevel = async function ({ orgId, clientId }: FilterQuery) {
    const Clients = this;
    const client: ClientType = await Clients.findOne({ orgId, _id: clientId });
    if (client.level === "gold") return 0;

    let level = "bronze";
    if (client.boughtsSalary >= client.bronzeTo) level = "silver";
    if (client.boughtsSalary >= client.silverTo) level = "gold";

    const updated = await Clients.updateOne({ orgId, _id: clientId }, { level });
    return updated.modifiedCount;
};

type ClientsModel = Model<TClient> & {
    updateLevel: (filterQuery: FilterQuery) => Promise<number>;
};

export const Clients = (models.clients as ClientsModel) || model("clients", schema);
export type ClientType = InferSchemaType<typeof schema>;
