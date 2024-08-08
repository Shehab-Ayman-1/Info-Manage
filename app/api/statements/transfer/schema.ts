import { z } from "zod";

export const editSchema = z.object({
    productId: z.string().min(1),
    place: z.enum(["market", "store"]),
    count: z.number().int().min(1),
});

export type EditTransferSchema = z.infer<typeof editSchema>;
