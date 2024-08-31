"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Image from "next/image";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";

import { createSchema, CreateCompanySchema } from "@/app/api/products/add-company/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { ComboBox } from "@/components/ui/comboBox";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type CompanyProps = {};

type RequestType = CreateCompanySchema;

const Company = ({}: CompanyProps) => {
    const { formState, register, watch, setValue, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(createSchema) });
    const { mutate, isPending: createPending } = useCreate<RequestType>("/api/products/add-company", []);

    const { categories, onReset } = useLists();
    const text = useTranslations();
    const router = useRouter();

    const { errors } = formState;
    const image: string = watch("image");

    useEffect(() => {
        (async () => await categories.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (values: any) => {
        const onSuccess = () => {
            router.push("/products/add-product");
            onReset(["companies"]);
        };

        mutate(values, { onSuccess });
    };

    const onUpload = (result: any) => result.event === "success" && setValue("image", result.info.url);
    const availableImageSrc = image?.startsWith("https://") || image?.startsWith("http://") || image?.startsWith("data:image");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardForm heading={text("pages.add-company.heading")} submitText={text("public.create")} disabled={createPending}>
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-[100%]">
                    <Image src={availableImageSrc ? image : "/overview.jpeg"} className="h-full w-full" alt="car" fill />
                </div>

                <CldUploadWidget uploadPreset="info-manage" onSuccess={onUpload}>
                    {({ open: onOpen }) => (
                        <Button type="button" variant="outline" className="flex-center mx-auto mt-4" onClick={() => onOpen()}>
                            {text("pages.add-company.upload-button")}
                        </Button>
                    )}
                </CldUploadWidget>

                <Input
                    type="url"
                    placeholder="image-url"
                    useTranslate={{ placeholder: "pages.add-company" }}
                    error={errors?.image}
                    {...register("image")}
                />

                <ComboBox
                    label="choose-category"
                    name="categoryId"
                    useTranslate={{ name: "public", trigger: "public", customeTrigger: true, justPlaceholder: true }}
                    loading={categories.isLoading}
                    items={categories.lists}
                    error={errors?.categoryId}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <Input
                    placeholder="company-name"
                    useTranslate={{ placeholder: "public" }}
                    error={errors?.name}
                    {...register("name")}
                />
            </CardForm>
        </form>
    );
};

Company.displayName = "Company";
export default Company;
