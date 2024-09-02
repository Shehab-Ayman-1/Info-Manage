"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";
import { ProductProfileType } from "./page";

import { editSchema, EditProfileSchema } from "@/app/api/profile/product/[productId]/schema";
import { SubmitButton } from "@/components/public/submit-btn";
import { DialogForm } from "@/components/ui/dialog";
import { Input } from "@/ui/input";

type UpdateDialogProps = {
    productId: string;
    data: ProductProfileType;
};

export const UpdateDialog = ({ productId, data }: UpdateDialogProps) => {
    const { mutate, isPending } = useUpdate<EditProfileSchema>(`/api/profile/product/${productId}`, [productId, "products"]);
    const { company, name, barcode, market, store } = data;

    const { formState, register, watch, handleSubmit } = useForm<EditProfileSchema>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            companyId: company._id,
            company: company.name,
            image: company.image,
            name,
            barcode,
            purchasePrice: market.price,
            salePrice: store.price,
            marketCount: market.count,
            storeCount: store.count,
        },
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
        <DialogForm
            heading={text("dialogs.product-profile.update-dialog.heading")}
            description={text("dialogs.product-profile.update-dialog.description")}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-[100%]">
                    <Image
                        src={availableImageSrc ? image : "/overview.jpeg"}
                        alt="car"
                        width={50}
                        height={50}
                        className="h-full w-full"
                    />
                </div>

                <hr className="my-4 dark:border-slate-500" />

                <div className="flex-between">
                    <Input
                        type="text"
                        label="company"
                        useTranslate={{ label: "public" }}
                        error={errors?.company}
                        {...register("company")}
                    />
                    <Input
                        type="url"
                        label="image-url"
                        useTranslate={{ label: "pages.add-company" }}
                        error={errors?.image}
                        {...register("image")}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="text"
                        label="product"
                        useTranslate={{ label: "public" }}
                        error={errors?.name}
                        {...register("name")}
                    />
                    <Input
                        type="text"
                        label="barcode"
                        useTranslate={{ label: "public" }}
                        error={errors?.barcode}
                        {...register("barcode")}
                    />
                </div>

                <hr className="my-4 dark:border-slate-500" />

                <div className="flex-between">
                    <Input
                        type="number"
                        label="purchase-price"
                        useTranslate={{ label: "public" }}
                        error={errors?.purchasePrice}
                        {...register("purchasePrice", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        label="sold-price"
                        useTranslate={{ label: "public" }}
                        error={errors?.salePrice}
                        {...register("salePrice", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        label="market-count"
                        useTranslate={{ label: "public" }}
                        error={errors?.marketCount}
                        {...register("marketCount", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        label="store-count"
                        useTranslate={{ label: "public" }}
                        error={errors?.storeCount}
                        {...register("storeCount", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="update" isPending={isPending} />
            </form>
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
