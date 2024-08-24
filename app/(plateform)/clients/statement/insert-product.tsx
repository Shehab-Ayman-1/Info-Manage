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
    total: z.number().positive(),
    soldPrice: z.number().positive(),
    purchasePrice: z.number().min(0),
});

export type ProductType = z.infer<typeof schema>;

type InsertProductProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const InsertProduct = ({ setProducts }: InsertProductProps) => {
    const { formState, register, setValue, watch, reset, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(schema.omit({ company: true, name: true, total: true })),
    });

    const { products } = useLists();
    const { type, onClose } = useModel();

    const { errors, isLoading } = formState;
    const selectedProductId = watch("productId");

    useEffect(() => {
        (async () => await products.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!selectedProductId) return;

        const product = products.data.find((product) => product._id === selectedProductId);
        setValue("purchasePrice", product?.purchasePrice);
        setValue("soldPrice", product?.soldPrice);
    }, [selectedProductId, products, setValue]);

    if (type === "delete-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { productId, count, soldPrice, ...product } = data as ProductType;
        const { name, company } = products.data.find((product) => product._id === productId)!;

        setProducts((products) => {
            const exist = products.find((item) => item.productId === productId);
            if (exist) {
                toast.info("This Product Is Already Exist");
                return products;
            }

            return products.concat({
                ...product,
                productId,
                name,
                count,
                soldPrice,
                company: company.name,
                total: count * soldPrice,
            });
        });

        reset();
        onClose();
    };

    console.log(errors);

    return (
        <DialogForm heading="Insert Product" description="All Fields Are Required">
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComboBox
                    label="Product Name"
                    name="productId"
                    loading={products.isLoading}
                    groups={products.groups}
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
                        {...register("soldPrice", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="Buy" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

InsertProduct.displayName = "InsertProduct";
