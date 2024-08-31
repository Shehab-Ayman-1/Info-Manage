"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType, schema } from "./schema";
import { toast } from "sonner";

import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Input } from "@/ui/input";
import { units } from "@/constants";
import { useTranslations } from "next-intl";

type InsertAndUpdateDialogProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const InsertAndUpdateDialog = ({ setProducts }: InsertAndUpdateDialogProps) => {
    const { formState, register, reset, setValue, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { type, data, onClose } = useModel();
    const { errors, isLoading } = formState;
    const text = useTranslations();

    useEffect(() => {
        if (type !== "edit-products-model" || !data?.product) return;
        setValue("min", data.product.min);
        setValue("name", data.product.name);
        setValue("barcode", data.product.barcode);
        setValue("randomId", data.product.randomId);
        setValue("storeCount", data.product.storeCount);
        setValue("sellingPrice", data.product.sellingPrice);
        setValue("marketCount", data.product.marketCount);
        setValue("purchasePrice", data.product.purchasePrice);
    }, [type, data, setValue]);

    if (type !== "insert-products-model" && type !== "edit-products-model") return;

    const onSubmitFn = (values: ProductType) => {
        setProducts((products) => {
            const isExist = products.some((product) => product.name === values.name);
            if (!isExist) return products.concat({ ...values, randomId: Date.now().toString(16) });

            toast.info("This Product Is Already Exist.");
            return products;
        });

        reset();
        onClose();
    };

    const onEditFn = (values: ProductType) => {
        setProducts((products) => {
            const product = products.find((product) => product.randomId === values.randomId);
            if (!product) {
                toast.info("Something Went Wrong");
                return products;
            }
            const newProducts = products.map((product) => (product.randomId === values.randomId ? values : product));
            return newProducts;
        });

        reset();
        onClose();
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as ProductType;
        if (type === "edit-products-model") onEditFn(values);
        else onSubmitFn(values);
    };

    return (
        <DialogForm
            description={text("dialogs.add-product.insert-dialog.description")}
            heading={
                type === "edit-products-model"
                    ? text("dialogs.add-product.insert-dialog.update-heading")
                    : text("dialogs.add-product.insert-dialog.insert-heading")
            }
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <Input
                        placeholder="product-name"
                        useTranslate={{ placeholder: "public" }}
                        error={errors?.name}
                        {...register("name")}
                    />
                    <Input
                        placeholder="optional-barcode"
                        useTranslate={{ placeholder: "dialogs.add-product.insert-dialog" }}
                        error={errors?.barcode}
                        {...register("barcode")}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="minimum"
                        useTranslate={{ placeholder: "dialogs.add-product.insert-dialog" }}
                        error={errors?.min}
                        {...register("min", { valueAsNumber: true })}
                    />
                    <ComboBox
                        label="unit"
                        name="unit"
                        useTranslate={{
                            label: "dialogs.add-product.insert-dialog",
                            trigger: "dialogs.add-product.insert-dialog",
                            name: "dialogs.add-product.insert-dialog",
                            item: "dialogs.add-product.insert-dialog",
                            justPlaceholder: true,
                        }}
                        items={units}
                        error={errors.unit}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="market-count"
                        useTranslate={{ placeholder: "dialogs.add-product.insert-dialog" }}
                        error={errors?.marketCount}
                        {...register("marketCount", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="store-count"
                        useTranslate={{ placeholder: "dialogs.add-product.insert-dialog" }}
                        error={errors?.storeCount}
                        {...register("storeCount", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="purchase-price"
                        useTranslate={{ placeholder: "dialogs.add-product.insert-dialog" }}
                        error={errors?.purchasePrice}
                        {...register("purchasePrice", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="selling-price"
                        useTranslate={{ placeholder: "dialogs.add-product.insert-dialog" }}
                        error={errors?.sellingPrice}
                        {...register("sellingPrice", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="insert" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

InsertAndUpdateDialog.displayName = "InsertAndUpdateDialog";
