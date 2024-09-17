"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useModel } from "@/hooks/useModel";

import { editSchema, EditSchemaType } from "@/app/api/suppliers/(show-suppliers)/schema";
import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type UpdateSupplierProps = {};

export const UpdateSupplier = ({}: UpdateSupplierProps) => {
    const { mutate, isPending } = useUpdate<EditSchemaType>("/api/suppliers", ["suppliers"]);
    const { formState, register, setValue, handleSubmit } = useForm({ resolver: zodResolver(editSchema) });

    const { type, data, onClose } = useModel();
    const { errors } = formState;

    const text = useTranslations();

    useEffect(() => {
        if (type !== "suppliers-update-info-model" || !data.supplier) return;
        setValue("supplierId", data.supplier._id);
        setValue("name", data.supplier.supplier);
        setValue("phone", data.supplier.phone);
    }, [type, data, setValue]);

    if (type !== "suppliers-update-info-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as EditSchemaType;
        mutate(values, { onSuccess: onClose });
    };

    return (
        <DialogForm heading={text("widgets.update-dialog.heading")} description={text("widgets.update-dialog.description")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    label="supplier-name"
                    useTranslate={{ label: "public" }}
                    error={errors.name}
                    {...register("name")}
                />
                <Input
                    type="number"
                    label="phone"
                    useTranslate={{ label: "public" }}
                    error={errors.phone}
                    {...register("phone")}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                    {text("buttons.update")}
                </Button>
            </form>
        </DialogForm>
    );
};

UpdateSupplier.displayName = "UpdateSupplier";
