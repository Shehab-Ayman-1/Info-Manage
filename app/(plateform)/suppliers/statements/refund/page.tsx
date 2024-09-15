"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";

import { createSchema, RefundSupplierType } from "@/app/api/suppliers/statements/refund/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { methods, place, process } from "@/constants";
import { columns } from "./table-columns";

import { InsertProductToTable, ProductType } from "@/widgets/public/insert-product-to-table";
import { RemoveItemFromTable } from "@/widgets/public/remove-item-from-table";
import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { AlertError } from "@/components/ui/alert-error";
import { ComboBox } from "@/components/ui/comboBox";
import { DataTable } from "@/components/table";
import { Input } from "@/ui/input";
import { cn } from "@/utils/shadcn";

type ClientsProps = {};

const Clients = ({}: ClientsProps) => {
    const { formState, register, watch, setValue, setError, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });

    const { mutate, isPending } = useCreate<RefundSupplierType>("/api/suppliers/statements/refund", ["supplier-invoices"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { suppliers, productsBySupplier } = useLists();
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
        (async () => productsBySupplier.fetcher(supplierId))();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierId]);

    // Auto Get Total Products Total Price
    useEffect(() => {
        if (processValue === "milestone") return;
        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);

        setValue("paid", productsTotalPrice);
    }, [products, processValue, setValue]);

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
        const values = data as RefundSupplierType;
        if (!products?.length) return setError("root", { message: "No Products Was Selected." });

        const filterProducts = products.map(({ company, soldPrice, purchasePrice, ...product }) => ({
            ...product,
            price: purchasePrice,
        }));
        mutate({ ...values, products: filterProducts }, { onSuccess: () => router.push("/") });
    };

    return (
        <CardForm heading={text("pages.refund-supplier-statement.heading")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <ComboBox
                        label="choose-supplier"
                        name="supplierId"
                        useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                        loading={suppliers.isLoading}
                        items={suppliers.lists}
                        error={errors.supplierId}
                        isSubmitted={isSubmitted}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        isSmallContent
                    />
                    <ComboBox
                        label="choose-method"
                        name="method"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        error={errors.method}
                        items={methods}
                        isSubmitted={isSubmitted}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        defaultValue="cash"
                        isSmallContent
                    />
                </div>

                <div className={cn("flex-between", processValue === "milestone" && "flex-wrap")}>
                    <ComboBox
                        label="choose-process"
                        name="process"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        items={process}
                        error={errors.process}
                        isSubmitted={isSubmitted}
                        onChange={onProcessChange}
                        clearErrors={clearErrors}
                        defaultValue="pay-all"
                        isSmallContent
                    />
                    <div className="flex-between w-full">
                        <ComboBox
                            label="choose-place"
                            name="place"
                            useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                            items={place}
                            error={errors.place}
                            isSubmitted={isSubmitted}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            defaultValue="market"
                            isSmallContent
                        />
                        {processValue === "milestone" && (
                            <Input
                                type="number"
                                label="pay"
                                useTranslate={{ label: "buttons" }}
                                error={errors.paid}
                                {...register("paid", { valueAsNumber: true })}
                            />
                        )}
                    </div>
                </div>

                <AlertError root={errors?.root} />
                <OpenModuleButton type="refund-supplier-statement-insert-model" clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="refund" isPending={isPending} />
            </form>

            <InsertProductToTable
                dialogType="refund-supplier-statement-insert-model"
                price={{ type: "purchasePrice", both: true }}
                setProducts={setProducts}
            />

            <RemoveItemFromTable
                dialogType="refund-supplier-statement-remove-model"
                filterKeys={{ id: "productId", data: "productId" }}
                setItems={setProducts}
            />
        </CardForm>
    );
};

Clients.displayName = "Clients";
export default Clients;
