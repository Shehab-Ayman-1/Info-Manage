import { z } from "zod";

export const editSchema = z.object({
    clientId: z.string().min(1),
    name: z.string().min(1),
    phone: z.string().length(11),
    bronzeTo: z.number().int().positive(),
    silverTo: z.number().int().positive(),
});

export type EditSchemaType = z.infer<typeof editSchema>;
