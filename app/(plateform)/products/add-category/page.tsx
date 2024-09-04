"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";

import { createSchema, CreateCategorySchema } from "@/app/api/products/add-category/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { Input } from "@/ui/input";

type CategoryProps = {};

const Category = ({}: CategoryProps) => {
    const { formState, register, handleSubmit } = useForm({ resolver: zodResolver(createSchema) });
    const { mutate, isPending } = useCreate<CreateCategorySchema>("/api/products/add-category", []);
    const { onReset } = useLists();
    const { errors } = formState;

    const text = useTranslations();
    const router = useRouter();

    const onSubmit = (data: any) => {
        const values = data as CreateCategorySchema;

        const onSuccess = () => {
            router.push("/products/add-company");
            onReset(["categories"]);
        };

        mutate(values, { onSuccess });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardForm heading={text("pages.add-category.heading")} submitText={text("buttons.create")} disabled={isPending}>
                <Input label="category-name" useTranslate={{ label: "public" }} error={errors.name} {...register("name")} />
            </CardForm>
        </form>
    );
};

Category.displayName = "Category";
export default Category;
