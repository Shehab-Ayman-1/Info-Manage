"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CardForm } from "@/components/page-structure/CardForm";
import { methods, place, process } from "@/constants";

import { CreateSupplierType, createSchema } from "@/app/api/suppliers/statements/new/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { AlertError } from "@/components/ui/alert-error";
import { DataTable } from "@/components/table";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { columns } from "./table-columns";

import { InsertProduct, ProductType } from "./insert-product";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DeleteDialog } from "./delete-dialog";
import { Input } from "@/ui/input";

type SuppliersProps = {};

const Suppliers = ({}: SuppliersProps) => {
    const { register, watch, setValue, setError, clearErrors, handleSubmit, formState } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });
    const { mutate, isPending } = useCreate<CreateSupplierType>("/api/suppliers/statements/new", ["supplier-bills"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { suppliers, productsBySupplier, onReset } = useLists();
    const { errors } = formState;

    const router = useRouter();
    const processValue = watch("process");
    const supplierId = watch("supplierId");

    useEffect(() => {
        (async () => await suppliers.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!supplierId) return;
        (async () => await productsBySupplier.fetcher?.(supplierId))();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierId]);

    useEffect(() => {
        // Auto Get Total Products Total Price
        if (processValue === "milestone") return;

        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);
        setValue("paid", productsTotalPrice || undefined);
    }, [products, setValue, processValue]);

    const onProcessChange = (value: string) => {
        if (value === "milestone") {
            setValue("process", "milestone");
            return setValue("paid", undefined);
        }

        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);
        setValue("process", "all");
        setValue("paid", productsTotalPrice);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (!products?.length) return setError("root", { message: "No Products Was Selected." });
        const values = data as CreateSupplierType;

        mutate(
            { ...values, products },
            {
                onSuccess: () => {
                    router.push("/");
                    onReset(["suppliers"]);
                },
            },
        );
    };

    return (
        <CardForm heading="Supplier Statement">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <ComboBox
                        label="Choose Supplier"
                        name="supplierId"
                        loading={suppliers.isLoading}
                        items={suppliers.lists}
                        error={errors?.supplierId}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                    <ComboBox label="Choose Place" name="place" error={errors?.place} items={place} setValue={setValue} />
                </div>

                <div className="flex-between">
                    <ComboBox label="Choose Method" name="method" error={errors?.method} items={methods} setValue={setValue} />
                    <ComboBox
                        label="Choose Process"
                        name="process"
                        error={errors?.process}
                        items={process}
                        onChange={onProcessChange}
                    />
                </div>

                {processValue === "milestone" && (
                    <Input
                        type="number"
                        placeholder="Paid Amount"
                        error={errors.paid}
                        {...register("paid", { valueAsNumber: true })}
                    />
                )}

                <AlertError root={errors?.root} />
                <OpenModuleButton type="insert-product-model" clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="Buy" isPending={isPending} />
            </form>

            <InsertProduct setProducts={setProducts} />
            <DeleteDialog setProducts={setProducts} />
        </CardForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
