"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { methods, place, process } from "@/constants";
import { CardForm } from "@/components/CardForm";
import { SelectBox } from "@/components/select";

import { CreateSupplierType, createSchema } from "@/app/api/statements/suppliers/schema";
import { OpenModuleButton } from "@/components/openModuleButton";
import { AlertError } from "@/components/alert-error";
import { DataTable } from "@/components/table";

import { InsertProducts, ProductType } from "./insertProducts";
import { SubmitButton } from "@/components/submit-btn";
import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";

import { columns } from "./table-columns";
import { Input } from "@/ui/input";

type SuppliersProps = {};

const Suppliers = ({}: SuppliersProps) => {
    const { register, watch, setValue, setError, clearErrors, handleSubmit, formState } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });
    const { mutate, isPending } = useCreate<CreateSupplierType>("/api/statements/suppliers", ["debts"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { suppliers, productsBySupplier } = useLists();
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
        mutate({ ...values, products }, { onSuccess: () => router.push("/") });
    };

    console.log(suppliers);

    return (
        <CardForm heading="Supplier Statement">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <SelectBox
                        label="Choose Supplier"
                        name="supplierId"
                        loading={suppliers.isLoading}
                        items={suppliers.lists}
                        error={errors?.supplierId}
                        setValue={setValue}
                    />
                    <SelectBox label="Choose Place" name="place" error={errors?.place} items={place} setValue={setValue} />
                </div>

                <div className="flex-between">
                    <SelectBox label="Choose Method" name="method" error={errors?.method} items={methods} setValue={setValue} />
                    <SelectBox
                        label="Choose Process"
                        name="process"
                        error={errors?.process}
                        items={process}
                        onChange={onProcessChange}
                    />
                </div>

                {processValue === "milestone" && (
                    <Input type="number" placeholder="Paid Amount" {...register("paid", { valueAsNumber: true })} />
                )}

                <AlertError root={errors?.root} />
                <OpenModuleButton clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} smallSize totalFor="total" />}

                <SubmitButton text="Buy" isPending={isPending} />
            </form>

            <InsertProducts setProducts={setProducts} />
        </CardForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
