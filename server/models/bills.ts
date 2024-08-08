import { InferSchemaType, Model, Schema, model, models } from "mongoose";

type TBill = {
    _id: string;
    orgId: string;
    client: any;
    createdAt: Date;

    paid: number;
    total: number;
    discount: number;
    state: "completed" | "pending";

    products: {
        _id: string;
        companyId: any;
        name: string;
        count: number;
        soldPrice: number;
        boughtPrice: number;
    }[];
};

const schema = new Schema<TBill>({
    orgId: { type: String, required: true, trim: true },
    client: { type: Schema.Types.ObjectId, ref: "clients", required: true },

    paid: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    state: { type: String, required: true, trim: true, enum: ["completed", "pending"] },

    products: [
        {
            companyId: { type: Schema.Types.ObjectId, required: true, ref: "companies" },
            name: { type: String, required: true, trim: true },
            count: { type: Number, required: true },
            soldPrice: { type: Number, required: true },
            boughtPrice: { type: Number, required: true },
        },
    ],

    createdAt: { type: Date, default: Date.now() },
});

export const Bills = (models.bills as Model<TBill>) || model<TBill>("bills", schema);
export type BillType = InferSchemaType<typeof schema>;
