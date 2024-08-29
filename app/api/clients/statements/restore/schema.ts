import { z } from "zod";

export const createSchema = z.object({
    billBarcode: z.number().min(1),

    products: z.array(
        z.object({
            productId: z.string().min(1),
            count: z.number().int().positive(),
            purchasePrice: z.number().positive(),
            soldPrice: z.number().positive(),
            total: z.number().positive(),
        }),
    ),
});

export type CreateClientType = z.infer<typeof createSchema>;
