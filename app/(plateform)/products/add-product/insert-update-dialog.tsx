"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType, schema } from "./schema";
import { toast } from "sonner";

import { SubmitButton } from "@/components/public/submit-btn";
import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Input } from "@/ui/input";

type InsertAndUpdateDialogProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const InsertAndUpdateDialog = ({ setProducts }: InsertAndUpdateDialogProps) => {
    const { formState, register, reset, setValue, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { onClose, type, data } = useModel();
    const { errors, isLoading } = formState;

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
            heading={type === "edit-products-model" ? "Update Product" : "Insert Product"}
            description="Please Fill All The Required Fields To Succefully Create The Account."
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Product Name" error={errors?.name} {...register("name")} />

                <div className="flex-between">
                    <Input placeholder="Barcode (Optional)" error={errors?.barcode} {...register("barcode")} />
                    <Input
                        type="number"
                        placeholder="Minimum Limit"
                        error={errors?.min}
                        {...register("min", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="Market Count"
                        error={errors?.marketCount}
                        {...register("marketCount", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="Store Count"
                        error={errors?.storeCount}
                        {...register("storeCount", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="Purchase Price"
                        error={errors?.purchasePrice}
                        {...register("purchasePrice", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="Selling Price"
                        error={errors?.sellingPrice}
                        {...register("sellingPrice", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="Insert" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

InsertAndUpdateDialog.displayName = "InsertAndUpdateDialog";
