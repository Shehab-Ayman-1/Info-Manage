import { Document, Model, InferSchemaType } from "mongoose";
import { Schema, models, model } from "mongoose";

type TClient = Document & {
    _id: string;
    orgId: string;

    name: string;
    phone: string;

    bronzeTo: number;
    silverTo: number;

    level: "bronze" | "silver" | "gold";
    lastRefreshDate: Date;

    trash: boolean;
    trashedAt: Date;

    discounts: number;
    purchases: number;
    pending: number;
};

const schema = new Schema<TClient>({
    orgId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },

    level: { type: String, enum: ["bronze", "silver", "gold"], default: "bronze" },
    phone: { type: String, required: true, trim: true },

    bronzeTo: { type: Number, required: true },
    silverTo: { type: Number, required: true },

    lastRefreshDate: { type: Date, default: new Date() },
    discounts: { type: Number, default: 0 },

    trash: { type: Boolean, default: false },
    trashedAt: { type: Date, default: null },

    pending: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
});

schema.index({ trashedAt: 1 }, { expireAfterSeconds: 0 });

type FilterQuery = {
    orgId: string;
    clientId: string;
};

type LastRefreshDate = FilterQuery & {
    refreshAfter?: number;
};

schema.statics.updateLevel = async function ({ orgId, clientId }) {
    const Clients = this;
    const client: ClientType = await Clients.findOne({ orgId, _id: clientId, trash: false });
    if (client.level === "gold") return 0;

    let level = "bronze";
    if (client.purchases >= client.bronzeTo) level = "silver";
    if (client.purchases >= client.silverTo) level = "gold";

    const updated = await Clients.updateOne({ orgId, _id: clientId, trash: false }, { level });
    return updated.modifiedCount;
};

schema.statics.updateLastRefreshDate = async function ({ orgId, clientId, refreshAfter = 3 }) {
    const Clients = this;

    const client: ClientType = await Clients.findOne({ orgId, _id: clientId, trash: false });
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

export const Clients = (models.clients as ClientsModel) || model<TClient>("clients", schema);
export type ClientType = InferSchemaType<typeof schema>;
