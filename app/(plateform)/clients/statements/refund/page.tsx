"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useCreate } from "@/hooks/api/useCreate";
import { columns } from "./table-columns";

import { createSchema, CreateClientType } from "@/app/api/clients/statements/refund/schema";
import { RemoveItemFromTable } from "@/widgets/public/remove-item-from-table";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { InsertProduct, ProductType } from "./insert-product";
import { AlertError } from "@/components/ui/alert-error";
import { DataTable } from "@/components/table";
import { Input } from "@/ui/input";

const RefundClientStatement = () => {
    const resolver = zodResolver(createSchema.omit({ products: true }));
    const { formState, register, watch, setError, clearErrors, handleSubmit } = useForm({ resolver });
    const invoiceBarcode = watch("invoiceBarcode");

    const { mutate, isPending } = useCreate<CreateClientType>("/api/clients/statements/refund", [
        "client-invoices",
        invoiceBarcode,
    ]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const { errors } = formState;

    const text = useTranslations();
    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as CreateClientType;
        if (!products.length) return setError("root", { message: "No Products Was Selected." });

        const filterProducts = products.map(({ company, name, ...product }) => product);
        mutate({ ...values, products: filterProducts }, { onSuccess: () => router.push("/") });
    };

    const showButtons = `${invoiceBarcode}`.length > 12 || products.length;

    return (
        <CardForm heading={text("pages.refund-client-statement.heading")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="number"
                    placeholder="barcode"
                    useTranslate={{ placeholder: "public" }}
                    error={errors.invoiceBarcode}
                    {...register("invoiceBarcode", { valueAsNumber: true })}
                />

                <AlertError root={errors?.root} />

                {!!showButtons && (
                    <OpenModuleButton
                        type="refund-client-statement-insert-dialog-model"
                        data={{ invoiceBarcode }}
                        clearErrors={clearErrors}
                    />
                )}

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}

                <SubmitButton text="refund" isPending={isPending} />
            </form>

            {`${invoiceBarcode}`.length > 12 && <InsertProduct invoiceBarcode={invoiceBarcode} setProducts={setProducts} />}

            <RemoveItemFromTable
                dialogType="refund-client-statement-remove-dialog-model"
                filterKeys={{ id: "productId", data: "productId" }}
                setItems={setProducts}
            />
        </CardForm>
    );
};

RefundClientStatement.displayName = "RefundClientStatement";
export default RefundClientStatement;
