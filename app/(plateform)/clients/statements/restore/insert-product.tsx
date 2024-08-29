"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { useModel } from "@/hooks/useModel";
import { useGet } from "@/hooks/api/useGet";

import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";
import { Input } from "@/ui/input";

const schema = z.object({
    productId: z.string().min(1),
    company: z.string().min(1),
    name: z.string().min(1),
    count: z.number().int().positive(),
    total: z.number().positive(),
    soldPrice: z.number().positive(),
    purchasePrice: z.number().min(0),
});

export type ProductType = z.infer<typeof schema>;

type InsertProductProps = {
    billBarcode: number;
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

type ProductResponse = {
    productId: string;
    productName: string;
    purchasePrice: number;
    soldPrice: number;
    count: number;
};

export const InsertProduct = ({ billBarcode, setProducts }: InsertProductProps) => {
    const { formState, register, setValue, watch, reset, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(schema.omit({ company: true, name: true, total: true })),
    });
    const { data, isPending } = useGet<ProductResponse[]>(`/api/clients/statements/restore/${billBarcode}`, []);

    const { type, onClose } = useModel();

    const { errors, isLoading } = formState;
    const selectedProductId = watch("productId");

    useEffect(() => {
        if (!selectedProductId || !data) return;
        const product = data.find((product) => product.productId === selectedProductId);
        if (!product) return;

        setValue("count", product.count);
        setValue("purchasePrice", product.purchasePrice);
        setValue("soldPrice", product.soldPrice);
    }, [data, selectedProductId, setValue]);

    if (type !== "insert-bill-products-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (formState) => {
        const { productId, count, soldPrice, ...product } = formState as ProductType;
        if (!data) return;

        const { productName } = data.find((product) => product.productId === productId)!;

        setProducts((products) => {
            const exist = products.find((item) => item.productId === productId);
            if (!exist)
                return products.concat({ ...product, productId, name: productName, count, soldPrice, total: count * soldPrice });

            toast.info("This Product Is Already Exist");
            return products;
        });

        reset();
        onClose();
    };

    const productLists = data?.map(({ productId, productName }) => ({ _id: productId, value: productId, title: productName }));

    return (
        <DialogForm heading="Insert Product" description="All Fields Are Required">
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComboBox
                    label="Product Name"
                    name="productId"
                    loading={isPending}
                    items={productLists || []}
                    error={errors?.productId}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="Count"
                        error={errors.count}
                        {...register("count", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        placeholder="Sold Price"
                        error={errors.soldPrice}
                        {...register("soldPrice", { valueAsNumber: true, disabled: true })}
                    />
                </div>

                <SubmitButton text="Buy" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

InsertProduct.displayName = "InsertProduct";
