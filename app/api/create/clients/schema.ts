import { z } from "zod";

export const createSchema = z
    .object({
        name: z.string().min(1),
        bronzeTo: z.number().int().min(0),
        silverTo: z.number().int().min(0),
    })
    .refine((data) => data.silverTo >= data.bronzeTo, {
        message: "Silver Must Be Greater Than Bronze",
        path: ["silverTo"],
    });

export type ClientCreateSchema = z.infer<typeof createSchema>;
