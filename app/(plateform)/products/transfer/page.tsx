"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useUpdate } from "@/hooks/api/useUpdate";
import { place as places } from "@/constants";

import { InsertProductToTable, ProductType } from "@/widgets/public/insert-product-to-table";
import { editSchema, EditTransferSchema } from "@/app/api/products/transfer/schema";
import { RemoveItemFromTable } from "@/widgets/public/remove-item-from-table";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DataTable } from "@/components/table";
import { columns } from "./table-columns";

const Transfer = () => {
    const { formState, setValue, watch, reset, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(editSchema.pick({ place: true })),
    });
    const { mutate, isPending } = useUpdate<EditTransferSchema>("/api/products/transfer", ["market", "store"]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const { isSubmitted, errors } = formState;

    const place = watch("place");
    const text = useTranslations();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { place } = data as EditTransferSchema;

        const filterProducts = products.map(({ productId, count }) => ({ _id: productId, count }));
        mutate(
            { products: filterProducts, place },
            {
                onSuccess: () => {
                    reset();
                    setProducts([]);
                },
            },
        );
    };

    return (
        <CardForm heading={text("pages.transfer.heading")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComboBox
                    label="transfer-to"
                    name="place"
                    useTranslate={{ label: "pages.transfer", trigger: "pages.transfer", name: "public", item: "public" }}
                    error={errors.place}
                    items={places}
                    isSubmitted={isSubmitted}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />

                <OpenModuleButton type="transfer-insert-model" clearErrors={clearErrors} />

                {!!products?.length && <DataTable columns={columns} data={products} smallSize />}

                <SubmitButton text="transfer" isPending={isPending} />
            </form>

            <InsertProductToTable
                dialogType="transfer-insert-model"
                price={{ type: place === "market" ? "soldPrice" : "purchasePrice", both: false }}
                setProducts={setProducts}
            />
            <RemoveItemFromTable
                dialogType="transfer-remove-model"
                filterKeys={{ id: "productId", data: "productId" }}
                setItems={setProducts}
            />
        </CardForm>
    );
};

Transfer.displayName = "Transfer";
export default Transfer;
