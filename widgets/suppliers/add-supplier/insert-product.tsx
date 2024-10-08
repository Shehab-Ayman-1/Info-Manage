"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { schema, SupplierType } from "@/app/(plateform)/suppliers/add-supplier/schema";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";

import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";

type InsertProductProps = {
    setProducts: Dispatch<SetStateAction<SupplierType[]>>;
};

export const InsertProduct = ({ setProducts }: InsertProductProps) => {
    const { formState, setValue, reset, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { isSubmitted, errors } = formState;
    const text = useTranslations();

    const { type } = useModel();
    const { products } = useLists();

    if (type !== "add-supplier-insert-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as SupplierType;
        const { name: productName, company } = products.data.find((product) => product._id === values.productId)!;

        setProducts((products) => {
            const isExist = products.some((product) => product.productId === values.productId);
            if (!isExist)
                return products.concat({ ...values, productName, companyName: company.name, randomId: Date.now().toString(16) });

            toast.info("This Product Is Already Exist");
            return products;
        });

        reset();
    };

    return (
        <DialogForm heading={text("widgets.insert-dialog.heading")} description={text("widgets.insert-dialog.description")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComboBox
                    label="product-name"
                    name="productId"
                    useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                    loading={products.isLoading}
                    groups={products.groups}
                    error={errors?.productId}
                    isSubmitted={isSubmitted}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />
                <SubmitButton text="insert" isPending={false} />
            </form>
        </DialogForm>
    );
};

InsertProduct.displayName = "InsertProduct";
