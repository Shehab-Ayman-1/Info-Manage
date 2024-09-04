import { z } from "zod";

const place = {
    price: z.number().positive(),
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
            unit: z.enum(["packet", "liter", "kilo"]),
            min: z.number().int().positive(),
            market: z.object(place).optional(),
            store: z.object(place).optional(),
        }),
    ),
});

export type CreateProductSchema = z.infer<typeof createSchema>;
