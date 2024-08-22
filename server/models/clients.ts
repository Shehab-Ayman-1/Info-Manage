import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TClient = Document & {
    _id: string;
    orgId: string;

    name: string;
    phone: number;

    level: "bronze" | "silver" | "gold";
    bronzeTo: number;
    silverTo: number;

    lastRefreshDate: Date;

    discounts: number;
    purchasesSalary: number;
    pendingCosts: number;
};

const schema = new Schema<TClient>({
    orgId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    level: { type: String, enum: ["bronze", "silver", "gold"], default: "bronze" },
    bronzeTo: { type: Number, required: true },
    silverTo: { type: Number, required: true },

    lastRefreshDate: { type: Date, default: new Date() },

    discounts: { type: Number, default: 0 },
    pendingCosts: { type: Number, default: 0 },
    purchasesSalary: { type: Number, default: 0 },
});

type FilterQuery = {
    orgId: string;
    clientId: string;
};

type LastRefreshDate = FilterQuery & { refreshAfter?: number };

schema.statics.updateLevel = async function ({ orgId, clientId }: FilterQuery) {
    const Clients = this;
    const client: ClientType = await Clients.findOne({ orgId, _id: clientId });
    if (client.level === "gold") return 0;

    let level = "bronze";
    if (client.purchasesSalary >= client.bronzeTo) level = "silver";
    if (client.purchasesSalary >= client.silverTo) level = "gold";

    const updated = await Clients.updateOne({ orgId, _id: clientId }, { level });
    return updated.modifiedCount;
};

schema.statics.updateLastRefreshDate = async function ({ orgId, clientId, refreshAfter = 3 }: LastRefreshDate) {
    const Clients = this;

    const client: ClientType = await Clients.findOne({ orgId, _id: clientId });
    if (!client) throw new Error("Something Went Wrong.");

    const currentDate = new Date();
    const lastRefreshDate = new Date(client.lastRefreshDate);

    const yearsDifference = (currentDate.getFullYear() - lastRefreshDate.getFullYear()) * 12;
    const monthsDifference = currentDate.getMonth() - lastRefreshDate.getMonth();
    const dateDiffrence = yearsDifference + monthsDifference;

    if (dateDiffrence >= refreshAfter) {
        client.lastRefreshDate = currentDate;
        await client.save();
    }
};

type ClientsModel = Model<TClient> & {
    updateLevel: (filterQuery: FilterQuery) => Promise<number>;
    updateLastRefreshDate: (filterQuery: LastRefreshDate) => Promise<undefined>;
};

export const Clients = (models.clients as ClientsModel) || model("clients", schema);
export type ClientType = InferSchemaType<typeof schema>;
