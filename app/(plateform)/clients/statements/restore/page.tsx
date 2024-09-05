"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { createSchema, CreateClientType } from "@/app/api/clients/statements/restore/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { InsertProduct, ProductType } from "./insert-product";

import { useCreate } from "@/hooks/api/useCreate";
import { columns } from "./table-columns";

import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { AlertError } from "@/components/ui/alert-error";
import { DataTable } from "@/components/table";
import { DeleteDialog } from "./delete-dialog";
import { Input } from "@/ui/input";

const RestoreClientStatement = () => {
    const resolver = zodResolver(createSchema.omit({ products: true }));
    const { formState, register, watch, setError, clearErrors, handleSubmit } = useForm({ resolver });
    const billBarcode = watch("billBarcode");

    const { mutate, isPending } = useCreate<CreateClientType>("/api/clients/statements/restore", ["client-bills", billBarcode]);
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

    const showButtons = `${billBarcode}`.length > 12 || products.length;

    return (
        <CardForm heading={text("pages.restore-client-statement.heading")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="number"
                    placeholder="barcode"
                    useTranslate={{ placeholder: "public" }}
                    error={errors.billBarcode}
                    {...register("billBarcode", { valueAsNumber: true })}
                />

                <AlertError root={errors?.root} />

                {!!showButtons && <OpenModuleButton type="insert-bill-products-model" clearErrors={clearErrors} />}

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}

                <SubmitButton text="restore" isPending={isPending} />
            </form>

            {`${billBarcode}`.length > 12 && <InsertProduct billBarcode={billBarcode} setProducts={setProducts} />}
            <DeleteDialog setProducts={setProducts} />
        </CardForm>
    );
};

RestoreClientStatement.displayName = "RestoreClientStatement";
export default RestoreClientStatement;
