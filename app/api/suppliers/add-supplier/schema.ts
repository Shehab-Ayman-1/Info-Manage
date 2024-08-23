import { z } from "zod";

export const createSchema = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().length(11).optional(),
    supplierId: z.string().optional(),
    productsIds: z.array(z.string({ required_error: "Product Id Is A Required Field" })),
});

export type CreateProductSchema = z.infer<typeof createSchema>;
