import { z } from "zod";

export const createSchema = z.object({
    reason: z.string().min(1),
    price: z.number().int().min(1),
    method: z.enum(["cash", "visa"]),
    process: z.enum(["withdraw", "deposit"]),
});

export type CreateLockerSchema = z.infer<typeof createSchema>;
