"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
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

import { RemoveItemFromTable } from "@/widgets/public/remove-item-from-table";
import { InsertProductToTable } from "@/widgets/public/insert-product-to-table";
import { ProductType } from "@/widgets/public/insert-product-to-table";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { Input } from "@/ui/input";

type SuppliersProps = {};

const Suppliers = ({}: SuppliersProps) => {
    const { register, watch, setValue, setError, clearErrors, handleSubmit, formState } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });
    const { mutate, isPending } = useCreate<CreateSupplierType>("/api/suppliers/statements/new", ["supplier-invoices"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { suppliers, productsBySupplier, onReset } = useLists();
    const { isSubmitted, errors } = formState;

    const processValue = watch("process");
    const supplierId = watch("supplierId");
    const text = useTranslations();
    const router = useRouter();
    const mount = useRef(false);

    useEffect(() => {
        if (mount.current) return;
        (async () => suppliers.fetcher())();
        mount.current = true;
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
        clearErrors("process");
        if (value === "milestone") {
            setValue("process", "milestone");
            return setValue("paid", "");
        }

        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);
        setValue("process", "all");
        setValue("paid", productsTotalPrice);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (!products?.length) return setError("root", { message: "No Products Was Selected." });
        const values = data as CreateSupplierType;

        const supplierProducts = products.map(({ productId, name, count, total, purchasePrice }) => ({
            productId,
            name,
            count,
            total,
            price: purchasePrice,
        }));

        mutate(
            { ...values, products: supplierProducts },
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
                        isSubmitted={isSubmitted}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        isSmallContent
                    />
                    <ComboBox
                        label="choose-place"
                        name="place"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        error={errors?.place}
                        items={place}
                        isSubmitted={isSubmitted}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        defaultValue="store"
                        isSmallContent
                    />
                </div>

                <div className="flex-between">
                    <ComboBox
                        label="choose-method"
                        name="method"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        error={errors?.method}
                        items={methods}
                        isSubmitted={isSubmitted}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        defaultValue="cash"
                        isSmallContent
                    />
                    <ComboBox
                        label="choose-process"
                        name="process"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        error={errors?.process}
                        items={process}
                        isSubmitted={isSubmitted}
                        onChange={onProcessChange}
                        clearErrors={clearErrors}
                        defaultValue="pay-all"
                        isSmallContent
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
                <OpenModuleButton type="new-supplier-statement-insert-model" clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="buy" isPending={isPending} />
            </form>

            <InsertProductToTable
                dialogType="new-supplier-statement-insert-model"
                price={{ type: "purchasePrice", both: true }}
                setProducts={setProducts}
            />

            <RemoveItemFromTable
                dialogType="new-supplier-statement-remove-model"
                filterKeys={{ id: "productId", data: "productId" }}
                setItems={setProducts}
            />
        </CardForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
