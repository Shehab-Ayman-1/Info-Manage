import { z } from "zod";

export const editSchema = z.object({
    companyId: z.string().min(1),
    company: z.string().min(1),
    image: z.string().min(1),
    name: z.string().min(1),
    barcode: z.string().optional(),

    purchasePrice: z.number().int().positive().min(1),
    salePrice: z.number().int().positive().min(1),
    marketCount: z.number().int().positive().min(1),
    storeCount: z.number().int().positive().min(1),
});

export type EditProfileSchema = z.infer<typeof editSchema>;
