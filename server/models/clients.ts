import { Schema, models, model, Model, InferSchemaType } from "mongoose";

type TClient = {
    _id: string;
    orgId: string;
    name: string;
    level: "bronze" | "silver" | "gold";
    levels: {
        name: "bronze" | "silver" | "gold";
        activeTo: number;
    }[];
    discounts: number;
    boughtsSalary: number;
    pendingCosts: number;
};

const schema = new Schema<TClient>({
    orgId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    levels: [
        {
            name: { type: String, enum: ["bronze", "silver"] },
            activeTo: Number,
        },
    ],
    level: { type: String, enum: ["bronze", "silver", "gold"], default: "bronze" },

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
    let level = "";

    const bronze = client.levels.find((client) => client.name === "bronze")!; // 5000
    const silver = client.levels.find((client) => client.name === "silver")!; // 15,000

    if (bronze.activeTo >= client.boughtsSalary) level = "bronze";
    if (client.boughtsSalary >= bronze.activeTo) level = "silver";
    if (client.boughtsSalary >= silver.activeTo) level = "gold";

    const updated = await Clients.updateOne({ orgId, _id: clientId }, { level });
    return updated.modifiedCount;
};

type ClientsModel = Model<TClient> & {
    updateLevel: (filterQuery: FilterQuery) => Promise<number>;
};

export const Clients = (models.clients as ClientsModel) || model("clients", schema);
export type ClientType = InferSchemaType<typeof schema>;
