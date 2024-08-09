"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";

import { createSchema, CreateCompanySchema } from "@/app/api/create/companies/schema";
import { CardForm } from "@/components/page-structure/CardForm";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";

import { SelectBox } from "@/components/ui/select";
import { Input } from "@/ui/input";

type CompanyProps = {};

type RequestType = CreateCompanySchema;

const Company = ({}: CompanyProps) => {
    const { register, handleSubmit, watch, setValue, formState } = useForm({ resolver: zodResolver(createSchema) });
    const { mutate, isPending: createPending } = useCreate<RequestType>("/api/create/companies", []);

    const { categories, onReset } = useLists();
    const router = useRouter();

    const { errors } = formState;
    const image: string = watch("image");

    useEffect(() => {
        (async () => await categories.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (values: any) => {
        const onSuccess = () => {
            router.push("/create/product");
            onReset(["companies"]);
        };

        mutate(values, { onSuccess });
    };

    const availableImageSrc = image?.startsWith("https://") || image?.startsWith("http://") || image?.startsWith("data:image");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardForm heading="Create Company" submitText="Create" disabled={createPending}>
                <Image
                    src={availableImageSrc ? image : "/overview.jpeg"}
                    alt="car"
                    width={150}
                    height={150}
                    className="m-auto mb-4 block rounded-[100%]"
                />

                <Input type="url" placeholder="Enter Image Link" error={errors?.image} {...register("image")} />

                <SelectBox
                    label="Category Name"
                    name="categoryId"
                    loading={categories.isLoading}
                    items={categories.lists}
                    error={errors?.categoryId}
                    setValue={setValue}
                />

                <Input placeholder="Company Name" error={errors?.name} {...register("name")} />
            </CardForm>
        </form>
    );
};

Company.displayName = "Company";
export default Company;
