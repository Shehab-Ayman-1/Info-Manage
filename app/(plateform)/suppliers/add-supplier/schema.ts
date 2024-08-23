import { z } from "zod";

export const schema = z.object({
    randomId: z.string().optional(),
    productId: z.string().min(1),
    productName: z.string().min(1).optional(),
    companyName: z.string().min(1).optional(),
});

export type SupplierType = z.infer<typeof schema>;
