import { z } from "zod";

const message = `Selected Date Must Be Greater Than Today Date`;
export const configsSchema = z.object({
    organizationId: z.string().min(1),

    bronzeTo: z.number().int().positive(),
    silverTo: z.number().int().positive(),

    removeUnnecessaryData: z.string().min(1),
    refreshClientsPurchases: z.string().min(1),

    subscription: z.enum(["unsubscribe", "basic"]).optional(),
    additionalSubscriptions: z.array(z.enum(["premium", "enterprise"])).optional(),
    additionalSubscriptionExpiresAt: z.date().min(new Date(), { message }).optional(),
});

export type EditConfigsSchema = z.infer<typeof configsSchema>;
