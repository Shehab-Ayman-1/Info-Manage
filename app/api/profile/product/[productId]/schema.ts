import { z } from "zod";

export const editSchema = z.object({
    companyId: z.string().min(1),
    company: z.string().min(1),

    image: z.string().min(1),
    name: z.string().min(1),

    barcode: z.string().optional(),
    min: z.number().positive(),

    purchasePrice: z.number().min(0),
    salePrice: z.number().min(0),

    marketCount: z.number().min(0),
    storeCount: z.number().min(0),
});

export type EditProfileSchema = z.infer<typeof editSchema>;
