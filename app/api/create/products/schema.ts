import { z } from "zod";

const place = {
    price: z.number().int().min(0),
    count: z.number().int().min(0),
    updatedAt: z.date().optional(),
};

export const createSchema = z.object({
    supplierId: z.string().min(1).optional(),
    companyId: z.string().min(1),
    products: z.array(
        z.object({
            name: z.string().min(1),
            barcode: z.string().optional(),

            min: z.number().int().min(1),

            market: z.object(place).optional(),
            store: z.object(place).optional(),
        }),
    ),
});

export type CreateProductSchema = z.infer<typeof createSchema>;
