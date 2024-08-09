"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";

import { SubmitButton } from "@/components/public/submit-btn";
import { DialogForm } from "@/components/ui/dialog";
import { SelectBox } from "@/components/ui/select";
import { Input } from "@/ui/input";

const schema = z.object({
    productId: z.string().min(1),
    name: z.string().min(1),
    price: z.number().int().positive().min(0),
    count: z.number().int().positive().min(0),
    total: z.number().int().positive().min(0),
});

export type ProductType = z.infer<typeof schema>;

type InsertProductsProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const InsertProducts = ({ setProducts }: InsertProductsProps) => {
    const { register, setValue, watch, reset, handleSubmit, formState } = useForm({
        resolver: zodResolver(schema.omit({ total: true, name: true })),
    });

    const { productsBySupplier } = useLists();
    const { onClose } = useModel();

    const { errors, isLoading } = formState;
    const selectedProductId = watch("productId");

    useEffect(() => {
        if (!selectedProductId) return;
        const product = productsBySupplier.data.find((product) => product._id === selectedProductId);

        setValue("price", product?.boughtPrice);
    }, [selectedProductId, productsBySupplier, setValue]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { productId, count, price } = data as ProductType;
        const { name } = productsBySupplier.data.find((product) => product._id === productId)!;

        setProducts((products) => {
            const exist = products.find((product) => product.productId === productId);
            if (!exist) return products.concat({ productId, name, count, price, total: count * price });

            toast.info("This Product Is Already Exist");
            return products;
        });

        reset();
        onClose();
    };

    return (
        <DialogForm heading="Insert Product" description="All Fields Are Required">
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectBox
                    label="Choose Product Name"
                    name="productId"
                    loading={productsBySupplier.isLoading}
                    items={productsBySupplier.lists}
                    error={errors.productId}
                    setValue={setValue}
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
                        placeholder="Bought Price"
                        error={errors.price}
                        {...register("price", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="Buy" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

InsertProducts.displayName = "InsertProducts";
