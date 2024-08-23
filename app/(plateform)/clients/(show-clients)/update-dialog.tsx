"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { editSchema, EditSchemaType } from "@/app/api/clients/(show-clients)/schema";
import { useUpdate } from "@/hooks/api/useUpdate";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type UpdateDialogProps = {};

export const UpdateDialog = ({}: UpdateDialogProps) => {
    const { mutate, isPending } = useUpdate<EditSchemaType>("/api/clients", ["clients"]);
    const { formState, register, setValue, handleSubmit } = useForm({
        resolver: zodResolver(editSchema),
    });
    const { type, data, onClose } = useModel();
    const { errors } = formState;

    useEffect(() => {
        if (type !== "update-model" || !data.client) return;
        setValue("clientId", data.client._id);
        setValue("name", data.client.client);
        setValue("phone", data.client.phone);
        setValue("bronzeTo", data.client.bronzeTo);
        setValue("silverTo", data.client.silverTo);
    }, [type, data, setValue]);

    if (type !== "update-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as EditSchemaType;
        mutate(values, { onSuccess: onClose });
    };

    return (
        <DialogForm heading="Update Client" description="Are You Sure, You Can't Undo This Action Again.">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Client Name" error={errors.name} {...register("name")} />
                <Input placeholder="Phone" error={errors.phone} {...register("phone")} />
                <Input placeholder="Bronze To:" error={errors.bronzeTo} {...register("bronzeTo", { valueAsNumber: true })} />
                <Input placeholder="Silver To:" error={errors.silverTo} {...register("silverTo", { valueAsNumber: true })} />

                <Button type="submit" className="w-full" disabled={isPending}>
                    Update
                </Button>
            </form>
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
