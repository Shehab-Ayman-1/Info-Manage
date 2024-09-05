"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useLists } from "@/hooks/data/useLists";
import { place } from "@/constants";

import { editSchema, EditTransferSchema } from "@/app/api/products/transfer/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { ComboBox } from "@/components/ui/comboBox";
import { Input } from "@/ui/input";

type TransferProps = {};

const Transfer = ({}: TransferProps) => {
    const { formState, register, setValue, reset, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(editSchema) });
    const { mutate, isPending } = useUpdate<EditTransferSchema>("/api/products/transfer", ["market", "store"]);
    const { products } = useLists();
    const { errors } = formState;

    const text = useTranslations();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { productId, place, count } = data as EditTransferSchema;
        mutate({ productId, place, count }, { onSuccess: () => reset() });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardForm heading={text("pages.transfer.heading")} submitText={text("pages.transfer.submit")} disabled={isPending}>
                <div className="flex-between">
                    <ComboBox
                        label="choose-product"
                        name="productId"
                        useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                        loading={products.isLoading}
                        groups={products.groups}
                        error={errors.productId}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                    <ComboBox
                        label="transfer-to"
                        name="place"
                        useTranslate={{ label: "pages.transfer", trigger: "pages.transfer", name: "public", item: "public" }}
                        error={errors.place}
                        items={place}
                        setValue={setValue}
                    />
                </div>

                <Input
                    type="number"
                    label="count"
                    useTranslate={{ label: "public" }}
                    error={errors.count}
                    {...register("count", { valueAsNumber: true })}
                />
            </CardForm>
        </form>
    );
};

Transfer.displayName = "Transfer";
export default Transfer;
