import { z } from "zod";

export const createSchema = z.object({
    categoryId: z.string({ required_error: "Category ID Is A Required Field" }).min(1),
    image: z.string({ required_error: "Image Is A Required Field" }).min(1),
    name: z.string({ required_error: "Name Is A Required Field" }).min(1),
});

export type CreateCompanySchema = z.infer<typeof createSchema>;
