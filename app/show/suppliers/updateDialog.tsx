"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { editSchema, EditSchemaType } from "@/app/api/show/suppliers/schema";
import { useUpdate } from "@/hooks/api/useUpdate";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type UpdateDialogProps = {};

export const UpdateDialog = ({}: UpdateDialogProps) => {
    const { mutate, isPending } = useUpdate<EditSchemaType>("/api/show/suppliers", ["suppliers"]);
    const { formState, register, setValue, handleSubmit } = useForm({ resolver: zodResolver(editSchema) });
    const { type, data, onClose } = useModel();
    const { errors } = formState;

    useEffect(() => {
        if (type !== "update-model" || !data.supplier) return;
        setValue("supplierId", data.supplier._id);
        setValue("name", data.supplier.supplier);
        setValue("phone", data.supplier.phone);
    }, [type, data, setValue]);

    if (type !== "update-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as EditSchemaType;
        mutate(values, { onSuccess: onClose });
    };

    return (
        <DialogForm heading="Update Supplier" description="Are You Sure, You Can't Undo This Action Again.">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Supplier Name" error={errors.name} {...register("name")} />
                <Input type="number" placeholder="Phone Number:" error={errors.phone} {...register("phone")} />

                <Button type="submit" className="w-full" disabled={isPending}>
                    Update
                </Button>
            </form>
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
