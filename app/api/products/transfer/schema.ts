import { z } from "zod";

const product = z.object({
    _id: z.string().min(1),
    count: z.number().min(0),
});

export const editSchema = z.object({
    place: z.enum(["market", "store"]),
    products: z.array(product),
});

export type EditTransferSchema = z.infer<typeof editSchema>;
