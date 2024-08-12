import { z } from "zod";

export const createSchema = z.object({
    clientId: z.string().min(1),
    method: z.enum(["cash", "visa"]),
    process: z.enum(["all", "milestone"]),
    paid: z.number().int().min(0),
    discount: z.number().int().min(0),

    products: z.array(
        z.object({
            productId: z.string().min(1),
            companyId: z.string().min(1),
            name: z.string().min(1),
            count: z.number().int().min(1),
            total: z.number().int().min(0),
            soldPrice: z.number().int().min(0),
            boughtPrice: z.number().int().min(0),
        }),
    ),
});

export type CreateClientType = z.infer<typeof createSchema>;
