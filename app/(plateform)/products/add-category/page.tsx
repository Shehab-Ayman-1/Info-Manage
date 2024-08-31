"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLists } from "@/hooks/data/useLists";
import { useCreate } from "@/hooks/api/useCreate";

import { CreateCategorySchema } from "@/app/api/products/add-category/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { Input } from "@/ui/input";
import { useTranslations } from "next-intl";

type CategoryProps = {};

const Category = ({}: CategoryProps) => {
    const { mutate, isPending } = useCreate<CreateCategorySchema>("/api/products/add-category", []);
    const [category, setCategory] = useState("");
    const { onReset } = useLists();
    const text = useTranslations();
    const router = useRouter();

    const onChange = (event: any) => {
        setCategory(event.target.value);
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        if (!category) return;

        const onSuccess = () => {
            router.push("/products/add-company");
            onReset(["categories"]);
        };

        mutate({ name: category }, { onSuccess });
    };

    return (
        <form onSubmit={onSubmit}>
            <CardForm heading={text("pages.add-category.heading")} submitText={text("public.create")} disabled={isPending}>
                <Input label="category-name" useTranslate={{ label: "public" }} onChange={onChange} disabled={isPending} />
            </CardForm>
        </form>
    );
};

Category.displayName = "Category";
export default Category;
