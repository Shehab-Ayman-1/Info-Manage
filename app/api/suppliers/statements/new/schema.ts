import { z } from "zod";

export const createSchema = z.object({
    supplierId: z.string().min(1),
    place: z.enum(["market", "store"]),
    method: z.enum(["cash", "visa"]),
    process: z.enum(["all", "milestone"]),
    paid: z.number().min(0),

    products: z.array(
        z.object({
            productId: z.string().min(1),
            name: z.string().min(1),
            count: z.number().positive(),
            price: z.number().positive(),
            total: z.number().positive(),
        }),
    ),
});

export type CreateSupplierType = z.infer<typeof createSchema>;
