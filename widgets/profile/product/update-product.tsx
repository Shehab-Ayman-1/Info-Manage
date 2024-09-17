"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";

import { editSchema, EditProfileSchema } from "@/app/api/profile/product/[productId]/schema";
import { ProductProfileType } from "@/app/(plateform)/profile/product/[productId]/page";
import { SubmitButton } from "@/components/public/submit-btn";
import { DialogForm } from "@/components/ui/dialog";
import { Input } from "@/ui/input";

type UpdateProductProps = {
    productId: string;
    data: ProductProfileType;
};

export const UpdateProduct = ({ productId, data }: UpdateProductProps) => {
    const { company, name, barcode, min, market, store } = data;

    const { mutate, isPending } = useUpdate<EditProfileSchema>(`/api/profile/product/${productId}`, [productId, "products"]);
    const { formState, register, watch, handleSubmit } = useForm<EditProfileSchema>({
        resolver: zodResolver(editSchema),
        defaultValues: { companyId: company._id },
    });

    const { type, onClose } = useModel();
    const { onReset } = useLists();

    const { errors } = formState;
    const text = useTranslations();

    if (type !== "update-profile") return;

    const image = watch("image");
    const availableImageSrc = image?.startsWith("https://") || image?.startsWith("http://") || image?.startsWith("data:image");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as EditProfileSchema;
        const onSuccess = () => {
            onClose();
            onReset(["products", "suppliers"]);
        };
        mutate({ ...values, image: availableImageSrc ? values.image : company.image }, { onSuccess });
    };

    return (
        <DialogForm heading={text("widgets.update-dialog.heading")} description={text("widgets.update-dialog.description")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-[100%]">
                    <Image
                        src={availableImageSrc ? image : "/images/overview.jpeg"}
                        alt="car"
                        width={50}
                        height={50}
                        className="h-full w-full"
                    />
                </div>

                <hr className="my-4 dark:border-slate-500" />

                <div className="">
                    <Input
                        type="url"
                        label="image-url"
                        useTranslate={{ label: "pages.add-company" }}
                        error={errors?.image}
                        {...register("image", { value: company.image })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="text"
                        label="company"
                        useTranslate={{ label: "public" }}
                        error={errors?.company}
                        {...register("company", { value: company.name })}
                    />
                    <Input
                        type="text"
                        label="product"
                        useTranslate={{ label: "public" }}
                        error={errors?.name}
                        {...register("name", { value: name })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="text"
                        label="minimum"
                        useTranslate={{ label: "table" }}
                        error={errors?.min}
                        {...register("min", { value: min, valueAsNumber: true })}
                    />
                    <Input
                        type="text"
                        label="barcode"
                        useTranslate={{ label: "public" }}
                        error={errors?.barcode}
                        {...register("barcode", { value: barcode })}
                    />
                </div>

                <hr className="my-4 dark:border-slate-500" />

                <div className="flex-between">
                    <Input
                        type="number"
                        label="purchase-price"
                        useTranslate={{ label: "public" }}
                        error={errors?.purchasePrice}
                        {...register("purchasePrice", { value: store.price, valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        label="sold-price"
                        useTranslate={{ label: "public" }}
                        error={errors?.salePrice}
                        {...register("salePrice", { value: market.price, valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        label="market-count"
                        useTranslate={{ label: "public" }}
                        error={errors?.marketCount}
                        {...register("marketCount", { value: market.count, valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        label="store-count"
                        useTranslate={{ label: "public" }}
                        error={errors?.storeCount}
                        {...register("storeCount", { value: store.count, valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="update" isPending={isPending} />
            </form>
        </DialogForm>
    );
};

UpdateProduct.displayName = "UpdateProduct";
