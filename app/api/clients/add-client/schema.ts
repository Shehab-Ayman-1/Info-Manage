import { z } from "zod";

export const createSchema = z
    .object({
        name: z.string().min(1),
        phone: z.string().length(11),
        bronzeTo: z.number().int().positive(),
        silverTo: z.number().int().positive(),
    })
    .refine((data) => data.silverTo >= data.bronzeTo, {
        message: "Silver Must Be Greater Than Bronze",
        path: ["silverTo"],
    });

export type ClientCreateSchema = z.infer<typeof createSchema>;
