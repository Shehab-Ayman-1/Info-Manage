import { z } from "zod";

export const schema = z.object({
    randomId: z.string().optional(),
    name: z.string().min(1),
    barcode: z.string().optional(),
    unit: z.enum(["packet", "liter", "kilo"]),
    min: z.number().int().positive(),
    storeCount: z.number().int().min(0),
    marketCount: z.number().int().min(0),
    purchasePrice: z.number().min(0),
    sellingPrice: z.number().min(0),
});

export type ProductType = z.infer<typeof schema>;
