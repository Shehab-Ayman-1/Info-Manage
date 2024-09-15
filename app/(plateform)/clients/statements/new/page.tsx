"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useCreate } from "@/hooks/api/useCreate";
import { useLists } from "@/hooks/data/useLists";
import { methods, process } from "@/constants";
import { columns } from "./table-columns";

import { RemoveItemFromTable } from "@/widgets/public/remove-item-from-table";
import { InsertProductToTable } from "@/widgets/public/insert-product-to-table";
import { ProductType } from "@/widgets/public/insert-product-to-table";

import { createSchema, CreateClientType } from "@/app/api/clients/statements/new/schema";
import { OpenModuleButton } from "@/components/public/openModuleButton";
import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { AlertError } from "@/components/ui/alert-error";
import { ComboBox } from "@/components/ui/comboBox";
import { DataTable } from "@/components/table";
import { Input } from "@/ui/input";
import { cn } from "@/utils/shadcn";

const Clients = () => {
    const { formState, register, watch, setValue, setError, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(createSchema.omit({ products: true })),
    });

    const { mutate, isPending } = useCreate<CreateClientType>("/api/clients/statements/new", ["client-invoices"]);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { clients } = useLists();
    const { isSubmitted, errors } = formState;

    const processValue = watch("process");
    const text = useTranslations();
    const router = useRouter();

    // Auto Get Total Products Total Price
    useEffect(() => {
        if (processValue === "milestone") return;
        const productsTotalPrice = products.reduce((prev, cur) => prev + cur?.total, 0);

        setValue("paid", productsTotalPrice);
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
        const values = data as CreateClientType;
        if (!products?.length) return setError("root", { message: "No Products Was Selected." });

        const filterProducts = products.map(({ company, name, ...product }) => product);
        mutate({ ...values, products: filterProducts }, { onSuccess: () => router.push("/") });
    };

    return (
        <CardForm heading={text("pages.new-client-statement.heading")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <ComboBox
                        label="choose-client"
                        name="clientId"
                        useTranslate={{ label: "public", trigger: "public", name: "public", customeTrigger: true }}
                        loading={clients.isLoading}
                        items={clients.lists}
                        error={errors?.clientId}
                        isSubmitted={isSubmitted}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        isSmallContent
                    />
                    <ComboBox
                        label="choose-method"
                        name="method"
                        useTranslate={{ label: "public", trigger: "public", name: "public", item: "public" }}
                        error={errors?.method}
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
                        useTranslate={{ label: "public", trigger: "public", name: "public", item: "public" }}
                        items={process}
                        error={errors?.process}
                        isSubmitted={isSubmitted}
                        onChange={onProcessChange}
                        defaultValue="pay-all"
                        isSmallContent
                    />

                    <div className="flex-between w-full">
                        <Input
                            type="number"
                            label="discount"
                            useTranslate={{ label: "public" }}
                            error={errors.discount}
                            {...register("discount", { valueAsNumber: true, value: 0 })}
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
                <OpenModuleButton type="new-client-statement-insert-product-model" clearErrors={clearErrors} />

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="buy" isPending={isPending} />
            </form>

            <InsertProductToTable
                dialogType="new-client-statement-insert-product-model"
                price={{ type: "soldPrice", both: true }}
                setProducts={setProducts}
            />

            <RemoveItemFromTable
                dialogType="new-client-statement-delete-model"
                filterKeys={{ id: "productId", data: "productId" }}
                setItems={setProducts}
            />
        </CardForm>
    );
};

Clients.displayName = "Clients";
export default Clients;
