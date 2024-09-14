"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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
    count: z.number().positive(),
    total: z.number().positive(),
    soldPrice: z.number().positive(),
    purchasePrice: z.number().min(0),
});

export type ProductType = z.infer<typeof schema>;

type InsertProductToTableProps = {
    price: { type: string; both: boolean };
    dialogType: string;
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const InsertProductToTable = ({ price, dialogType, setProducts }: InsertProductToTableProps) => {
    const { formState, register, setValue, watch, reset, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(schema.pick({ productId: true, count: true, soldPrice: true, purchasePrice: true })),
    });

    const { isSubmitted, errors } = formState;
    const { products } = useLists();
    const { type } = useModel();

    const selectedProductId = watch("productId");
    const text = useTranslations();

    useEffect(() => {
        if (!selectedProductId) return;

        const product = products.data.find((product) => product._id === selectedProductId);
        setValue("purchasePrice", product?.purchasePrice);

        setValue("soldPrice", product?.soldPrice);
        setValue("count", 1);
    }, [selectedProductId, products, setValue]);

    if (type !== dialogType) return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { productId, count, soldPrice, purchasePrice, ...product } = data as ProductType;
        const { name, company } = products.data.find((product) => product._id === productId)!;

        setProducts((products) => {
            const exist = products.find((item) => item.productId === productId);
            if (exist) {
                toast.info("This Product Is Already Exist");
                return products;
            }

            let newProduct;
            if (price.type === "soldPrice" && !price.both)
                newProduct = { ...product, productId, name, count, soldPrice, company: company.name, total: count * soldPrice };

            if (price.type === "purchasePrice" && !price.both)
                newProduct = {
                    ...product,
                    productId,
                    name,
                    count,
                    purchasePrice,
                    company: company.name,
                    total: count * purchasePrice,
                };

            if (price.both)
                newProduct = {
                    ...product,
                    productId,
                    name,
                    count,
                    soldPrice,
                    purchasePrice,
                    company: company.name,
                    total: count * (price.type === "soldPrice" ? soldPrice : purchasePrice),
                };

            return products.concat(newProduct as ProductType);
        });

        reset();
    };

    return (
        <DialogForm
            heading={text("dialogs.new-client-statement.insert-dialog.heading")}
            description={text("dialogs.new-client-statement.insert-dialog.description")}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComboBox
                    label="choose-product"
                    name="productId"
                    useTranslate={{ label: "public", trigger: "public", name: "public", customeTrigger: true }}
                    loading={products.isLoading}
                    groups={products.groups}
                    error={errors.productId}
                    isSubmitted={isSubmitted}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <div className="flex-between">
                    <Input
                        type="number"
                        label="count"
                        useTranslate={{ label: "public" }}
                        {...register("count", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        label={price.type === "soldPrice" ? "sold-price" : "purchase-price"}
                        useTranslate={{ label: "public" }}
                        {...register("soldPrice", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="insert" isPending={false} />
            </form>
        </DialogForm>
    );
};

InsertProductToTable.displayName = "InsertProductToTable";
