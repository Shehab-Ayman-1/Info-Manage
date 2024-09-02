"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
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

    const processValue = watch("process");
    const supplierId = watch("supplierId");
    const router = useRouter();
    const text = useTranslations();

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
        <CardForm heading={text("pages.new-supplier-statement.heading")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <ComboBox
                        label="choose-supplier"
                        name="supplierId"
                        useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                        loading={suppliers.isLoading}
                        items={suppliers.lists}
                        error={errors?.supplierId}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                    <ComboBox
                        label="choose-place"
                        name="place"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        error={errors?.place}
                        items={place}
                        setValue={setValue}
                    />
                </div>

                <div className="flex-between">
                    <ComboBox
                        label="choose-method"
                        name="method"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        error={errors?.method}
                        items={methods}
                        setValue={setValue}
                    />
                    <ComboBox
                        label="choose-process"
                        name="process"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        error={errors?.process}
                        items={process}
                        onChange={onProcessChange}
                    />
                </div>

                {processValue === "milestone" && (
                    <Input
                        type="number"
                        label="pay"
                        useTranslate={{ label: "buttons" }}
                        error={errors.paid}
                        {...register("paid", { valueAsNumber: true })}
                    />
                )}

                <AlertError root={errors?.root} />
                <OpenModuleButton type="insert-product-model" clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="buy" isPending={isPending} />
            </form>

            <InsertProduct setProducts={setProducts} />
            <DeleteDialog setProducts={setProducts} />
        </CardForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
