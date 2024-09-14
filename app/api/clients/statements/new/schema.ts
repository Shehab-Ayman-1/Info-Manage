import { z } from "zod";

export const createSchema = z.object({
    clientId: z.string().min(1),
    paid: z.number().positive(),
    discount: z.number().min(0),
    method: z.enum(["cash", "visa"]),
    process: z.enum(["all", "milestone"]),

    products: z.array(
        z.object({
            productId: z.string().min(1),
            count: z.number().positive(),
            total: z.number().positive(),
            soldPrice: z.number().positive(),
            purchasePrice: z.number().positive(),
        }),
    ),
});

export type CreateClientType = z.infer<typeof createSchema>;
