import { z } from "zod";

export const schema = z.object({
    randomId: z.string().optional(),
    name: z.string().min(1),
    barcode: z.string().optional(),
    min: z.number().min(0).int(),
    storeCount: z.number().min(0).int(),
    marketCount: z.number().min(0).int(),
    purchasePrice: z.number().min(0),
    sellingPrice: z.number().min(0),
});

export type ProductType = z.infer<typeof schema>;
