import { z } from "zod";

export const configsSchema = z.object({
    organizationId: z.string().min(1),
    bronzeTo: z.number().int().positive(),
    silverTo: z.number().int().positive(),
    removeUnnecessaryData: z.string().min(1),
    refreshClientsPurchases: z.string().min(1),
});

export type EditConfigsSchema = z.infer<typeof configsSchema>;
