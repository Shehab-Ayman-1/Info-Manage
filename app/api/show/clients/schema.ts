import { z } from "zod";

export const editSchema = z.object({
    clientId: z.string().min(1),
    name: z.string().min(1),
    bronzeTo: z.number().int().positive().min(0),
    silverTo: z.number().int().positive().min(0),
});

export type EditSchemaType = z.infer<typeof editSchema>;
