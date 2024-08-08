import { z } from "zod";

export const createSchema = z.object({
    name: z.string({ required_error: "Name Is A Required Field" }),
});

export type CreateCategorySchema = z.infer<typeof createSchema>;
