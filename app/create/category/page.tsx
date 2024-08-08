"use client";
import type { CreateCategorySchema } from "@/app/api/create/categories/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLists } from "@/hooks/data/useLists";
import { useCreate } from "@/hooks/api/useCreate";

import { CardForm } from "@/components/CardForm";
import { Input } from "@/ui/input";

type CategoryProps = {};

const Category = ({}: CategoryProps) => {
    const { mutate, isPending } = useCreate<CreateCategorySchema>("/api/create/categories", []);
    const [category, setCategory] = useState("");
    const { onReset } = useLists();
    const router = useRouter();

    const onChange = (event: any) => {
        setCategory(event.target.value);
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        if (!category) return;

        const onSuccess = () => {
            router.push("/create/company");
            onReset(["categories"]);
        };

        mutate({ name: category }, { onSuccess });
    };

    return (
        <form onSubmit={onSubmit}>
            <CardForm heading="Create Category" submitText="Create" disabled={isPending}>
                <Input placeholder="Category Name" onChange={onChange} disabled={isPending} />
            </CardForm>
        </form>
    );
};

Category.displayName = "Category";
export default Category;
