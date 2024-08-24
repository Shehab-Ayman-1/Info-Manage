"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";

import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";
import { Input } from "@/ui/input";

const schema = z.object({
    productId: z.string().min(1),
    company: z.string().min(1),
    name: z.string().min(1),
    count: z.number().int().positive(),
    price: z.number().positive(),
    total: z.number().positive(),
});

export type ProductType = z.infer<typeof schema>;

type InsertProductProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const InsertProduct = ({ setProducts }: InsertProductProps) => {
    const { formState, register, setValue, watch, reset, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(schema.omit({ total: true, name: true, company: true })),
    });

    const { productsBySupplier } = useLists();
    const { type, onClose } = useModel();

    const { errors, isLoading } = formState;
    const selectedProductId = watch("productId");

    useEffect(() => {
        if (!selectedProductId) return;
        const product = productsBySupplier.data.find((product) => product._id === selectedProductId);
        setValue("price", product?.purchasePrice);
    }, [selectedProductId, productsBySupplier, setValue]);

    if (type === "delete-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { productId, count, price } = data as ProductType;
        const { name, company } = productsBySupplier.data.find((product) => product._id === productId)!;

        setProducts((products) => {
            const exist = products.find((product) => product.productId === productId);
            if (!exist) return products.concat({ company: company.name, productId, name, count, price, total: count * price });

            toast.info("This Product Is Already Exist");
            return products;
        });

        reset();
        onClose();
    };

    return (
        <DialogForm heading="Insert Product" description="All Fields Are Required">
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComboBox
                    label="Choose Product Name"
                    name="productId"
                    loading={productsBySupplier.isLoading}
                    groups={productsBySupplier.groups}
                    error={errors.productId}
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
                        placeholder="Purchase Price"
                        error={errors.price}
                        {...register("price", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="Buy" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

InsertProduct.displayName = "InsertProduct";
