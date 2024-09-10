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
    soldPrice: z.number().min(0),
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

    const { productsBySupplier } = useLists();
    const { type, onClose } = useModel();

    const { errors, isLoading } = formState;
    const selectedProductId = watch("productId");
    const text = useTranslations();

    useEffect(() => {
        if (!selectedProductId) return;

        const product = productsBySupplier.data.find((product) => product._id === selectedProductId);
        if (!product) return;

        setValue("purchasePrice", product.purchasePrice);
        setValue("soldPrice", product.purchasePrice);
    }, [selectedProductId, productsBySupplier, setValue]);

    if (type !== "insert-products-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { productId, count, purchasePrice, ...product } = data as ProductType;
        const { name, company } = productsBySupplier.data.find((product) => product._id === productId)!;

        setProducts((products) => {
            const exist = products.find((item) => item.productId === productId);
            if (exist) {
                toast.info("This Product Is Already Exist");
                return products;
            }

            const p = { ...product, productId, name, count, purchasePrice, company: company.name, total: count * purchasePrice };
            return products.concat(p);
        });

        reset();
        onClose();
    };

    return (
        <DialogForm
            heading={text("dialogs.refund-supplier-statement.insert-dialog.heading")}
            description={text("dialogs.refund-supplier-statement.insert-dialog.description")}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComboBox
                    label="choose-product"
                    name="productId"
                    useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                    loading={productsBySupplier.isLoading}
                    groups={productsBySupplier.groups}
                    error={errors?.productId}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <div className="flex-between">
                    <Input
                        type="number"
                        label="count"
                        useTranslate={{ label: "public" }}
                        error={errors.count}
                        {...register("count", { valueAsNumber: true })}
                    />
                    <Input
                        type="number"
                        label="purchase-price"
                        useTranslate={{ label: "public" }}
                        error={errors.purchasePrice}
                        {...register("soldPrice", { valueAsNumber: true })}
                    />
                </div>

                <SubmitButton text="insert" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

InsertProduct.displayName = "InsertProduct";
