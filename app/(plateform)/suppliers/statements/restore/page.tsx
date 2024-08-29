"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createSchema, RestoreSupplierType } from "@/app/api/suppliers/statements/restore/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { InsertProduct, ProductType } from "./insert-product";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { methods, place, process } from "@/constants";
import { columns } from "./table-columns";

import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { AlertError } from "@/components/ui/alert-error";
import { ComboBox } from "@/components/ui/comboBox";
import { DataTable } from "@/components/table";
import { DeleteDialog } from "./delete-dialog";
import { Input } from "@/ui/input";
import { cn } from "@/utils/shadcn";

type ClientsProps = {};

const Clients = ({}: ClientsProps) => {
    const { formState, register, watch, setValue, setError, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });

    const { mutate, isPending } = useCreate<RestoreSupplierType>("/api/suppliers/statements/restore", ["supplier-bills"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { suppliers, productsBySupplier } = useLists();
    const { errors } = formState;

    const processValue = watch("process");
    const supplierId = watch("supplierId");
    const router = useRouter();

    useEffect(() => {
        (async () => await suppliers.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!supplierId) return;
        (async () => await productsBySupplier.fetcher?.(supplierId))();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierId]);

    // Auto Get Total Products Total Price
    useEffect(() => {
        if (processValue === "milestone") return;
        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);

        setValue("paid", productsTotalPrice);
    }, [products, processValue, setValue]);

    const onProcessChange = (value: string) => {
        if (value === "milestone") {
            setValue("process", "milestone");
            return setValue("paid", "");
        }

        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);
        setValue("process", "all");
        setValue("paid", productsTotalPrice);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as RestoreSupplierType;
        if (!products?.length) return setError("root", { message: "No Products Was Selected." });

        const filterProducts = products.map(({ company, soldPrice, purchasePrice, ...product }) => ({
            ...product,
            price: purchasePrice,
        }));
        mutate({ ...values, products: filterProducts }, { onSuccess: () => router.push("/") });
    };

    return (
        <CardForm heading="Supplier Restore Statement">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <ComboBox
                        label="Choose Supplier"
                        name="supplierId"
                        loading={suppliers.isLoading}
                        items={suppliers.lists}
                        error={errors.supplierId}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                    <ComboBox
                        label="Choose Method"
                        name="method"
                        error={errors.method}
                        items={methods}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                </div>

                <div className={cn("flex-between", processValue === "milestone" && "flex-wrap")}>
                    <ComboBox
                        label="Choose Process"
                        name="process"
                        items={process}
                        error={errors.process}
                        onChange={onProcessChange}
                    />
                    <div className="flex-between w-full">
                        <ComboBox
                            label="Place"
                            name="place"
                            items={place}
                            error={errors.place}
                            setValue={setValue}
                            clearErrors={clearErrors}
                        />
                        {processValue === "milestone" && (
                            <Input
                                type="number"
                                placeholder="Amount"
                                error={errors.paid}
                                {...register("paid", { valueAsNumber: true })}
                            />
                        )}
                    </div>
                </div>

                <AlertError root={errors?.root} />
                <OpenModuleButton type="insert-products-model" clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="Buy" isPending={isPending} />
            </form>

            <InsertProduct setProducts={setProducts} />
            <DeleteDialog setProducts={setProducts} />
        </CardForm>
    );
};

Clients.displayName = "Clients";
export default Clients;
