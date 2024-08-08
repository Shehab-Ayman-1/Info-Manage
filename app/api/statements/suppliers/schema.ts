import { z } from "zod";

export const createSchema = z.object({
    supplierId: z.string().min(1),
    place: z.enum(["market", "store"]),
    method: z.enum(["cash", "visa"]),
    process: z.enum(["all", "milestone"]),
    paid: z.number().int().min(0),

    products: z.array(
        z.object({
            productId: z.string().min(1),
            name: z.string().min(1),
            count: z.number().int().min(1),
            price: z.number().int().min(1),
            total: z.number().int().min(1),
        }),
    ),
});

export type CreateSupplierType = z.infer<typeof createSchema>;
