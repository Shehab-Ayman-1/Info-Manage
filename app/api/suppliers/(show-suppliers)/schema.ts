import { z } from "zod";

export const editSchema = z.object({
    supplierId: z.string().min(1),
    name: z.string().min(1),
    phone: z.string().length(11),
});

export type EditSchemaType = z.infer<typeof editSchema>;
