"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { RepeatIcon } from "lucide-react";
import { useState } from "react";

import { createSchema, CreateClientType } from "@/app/api/clients/statements/restore/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { InsertProduct, ProductType } from "./insert-product";

import { useCreate } from "@/hooks/api/useCreate";
import { useModel } from "@/hooks/useModel";
import { columns } from "./table-columns";

import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { AlertError } from "@/components/ui/alert-error";
import { DeleteBillDialog } from "./delete-bill-dialog";
import { DataTable } from "@/components/table";
import { DeleteDialog } from "./delete-dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

const RestoreClientStatement = () => {
    const { formState, register, watch, setError, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });

    const { mutate, isPending } = useCreate<CreateClientType>("/api/clients/statements/restore", ["client-bills"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { onOpen } = useModel();
    const { errors } = formState;

    const billBarcode = watch("billBarcode");
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

                <div className="flex-between">
                    {!!showButtons && <OpenModuleButton type="insert-bill-products-model" clearErrors={clearErrors} />}

                    {!!showButtons && (
                        <Button
                            type="button"
                            variant="ghost"
                            className="group mx-auto mt-4 w-fit gap-4 text-rose-500 hover:text-rose-700"
                            onClick={() => onOpen("delete-bill-model", { billBarcode })}
                        >
                            <RepeatIcon className="size-4 !text-rose-500 hover:text-rose-700 group-hover:!text-rose-700" />
                            {text("pages.restore-statement.cancel-bill-btn")}
                        </Button>
                    )}
                </div>

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="restore" isPending={isPending} />
            </form>

            {`${billBarcode}`.length > 12 && <InsertProduct billBarcode={billBarcode} setProducts={setProducts} />}
            <DeleteDialog setProducts={setProducts} />
            <DeleteBillDialog />
        </CardForm>
    );
};

RestoreClientStatement.displayName = "RestoreClientStatement";
export default RestoreClientStatement;
