"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useCreate } from "@/hooks/api/useCreate";
import { useModel } from "@/hooks/useModel";
import { columns } from "./table-columns";

import { createSchema } from "@/app/api/suppliers/statements/new/schema";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";
import { DataTable } from "@/components/table";
import { methods, process } from "@/constants";
import { Input } from "@/ui/input";

type StatementDialogType = {
    mutateGetQuery: any;
    supplierId: string;
    place: string;
};

export const StatementDialog = ({ supplierId, place, mutateGetQuery }: StatementDialogType) => {
    const { formState, watch, reset, register, setValue, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(createSchema.pick({ method: true, process: true, paid: true })),
    });
    const { mutate, isPending } = useCreate("/api/suppliers/statements/new", ["insufficients"]);
    const { type, data, onClose } = useModel();
    const { isSubmitted, errors } = formState;

    const processValue = watch("process");
    const text = useTranslations();

    const products = data?.items?.map((item: any) => ({ ...item, total: item.checkedCount * item.purchasePrice }));

    // Auto Get Total Products Total Price
    useEffect(() => {
        if (processValue === "milestone" || !products) return;

        const productsTotalPrice = products.reduce((prev: number, cur: any) => prev + cur?.purchasePrice * cur?.checkedCount, 0);
        setValue("paid", productsTotalPrice || "");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products, processValue]);

    if (type !== "selected-buy-model" || !products) return;

    const onProcessChange = (value: string) => {
        clearErrors("process");
        if (value === "milestone") {
            setValue("process", "milestone");
            return setValue("paid", "");
        }

        const productsTotalPrice = data?.items.reduce((prev: number, cur: any) => prev + cur?.total, 0);
        setValue("process", "all");
        setValue("paid", productsTotalPrice);
    };

    const onSubmit = (values: any) => {
        const newStatement = {
            supplierId,
            place,
            paid: values.paid,
            method: values.method,
            process: values.process,
            products: products.map(({ productId, product, checkedCount, purchasePrice, total }: any) => ({
                productId,
                name: product,
                price: purchasePrice,
                count: checkedCount,
                total,
            })),
        };
        mutate(newStatement, {
            onSuccess: () => {
                reset();
                onClose();
                mutateGetQuery(`supplierId=${supplierId}&place=${place}`);
            },
        });
    };

    return (
        <DialogForm heading={text("widgets.insert-dialog.heading")} description={text("widgets.insert-dialog.description")}>
            <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden">
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

                {!!products.length && <DataTable columns={columns} data={products} totalFor="total" smallSize />}
                <SubmitButton text="buy" isPending={supplierId === "all" || isPending} />
            </form>
        </DialogForm>
    );
};

StatementDialog.displayName = "StatementDialog";
