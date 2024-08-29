"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { Button } from "@/ui/button";
import { useModel } from "@/hooks/useModel";
import { RepeatIcon } from "lucide-react";
import { DeleteBillDialog } from "./delete-bill-dialog";

const RestoreClientStatement = () => {
    const { formState, register, watch, setError, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });

    const { mutate, isPending } = useCreate<CreateClientType>("/api/clients/statements/restore", ["client-bills"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { onOpen } = useModel();
    const { errors } = formState;

    const billBarcode = watch("billBarcode");
    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as CreateClientType;
        if (!products.length) return setError("root", { message: "No Products Was Selected." });

        const filterProducts = products.map(({ company, name, ...product }) => product);
        mutate({ ...values, products: filterProducts }, { onSuccess: () => router.push("/") });
    };

    const showButtons = `${billBarcode}`.length > 12 || products.length;

    return (
        <CardForm heading="Client Restore Statement">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="number"
                    placeholder="Enter Bill Barcode"
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
                            className="group mx-auto mt-4 w-fit text-rose-500 hover:text-rose-700"
                            onClick={() => onOpen("delete-bill-model", { billBarcode })}
                        >
                            <RepeatIcon className="mr-4 size-4 !text-rose-500 hover:text-rose-700 group-hover:!text-rose-700" />
                            Restore All Products
                        </Button>
                    )}
                </div>

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="Buy" isPending={isPending} />
            </form>

            {`${billBarcode}`.length > 12 && <InsertProduct billBarcode={billBarcode} setProducts={setProducts} />}
            <DeleteDialog setProducts={setProducts} />
            <DeleteBillDialog />
        </CardForm>
    );
};

RestoreClientStatement.displayName = "RestoreClientStatement";
export default RestoreClientStatement;
