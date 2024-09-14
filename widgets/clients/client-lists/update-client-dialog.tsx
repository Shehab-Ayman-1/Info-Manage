"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { editSchema, EditSchemaType } from "@/app/api/clients/(show-clients)/schema";
import { useUpdate } from "@/hooks/api/useUpdate";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export const UpdateDialog = () => {
    const { formState, register, setValue, handleSubmit } = useForm({ resolver: zodResolver(editSchema) });
    const { mutate, isPending } = useUpdate<EditSchemaType>("/api/clients", ["clients"]);
    const { type, data, onClose } = useModel();
    const text = useTranslations();
    const { errors } = formState;

    useEffect(() => {
        if (type !== "client-lists-update-model" || !data.client) return;
        setValue("clientId", data.client._id);
        setValue("name", data.client.client);
        setValue("phone", data.client.phone);
        setValue("bronzeTo", data.client.bronzeTo);
        setValue("silverTo", data.client.silverTo);
    }, [type, data, setValue]);

    if (type !== "client-lists-update-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as EditSchemaType;
        mutate(values, { onSuccess: onClose });
    };

    return (
        <DialogForm
            heading={text("dialogs.show-clients.update-dialog.heading")}
            description={text("dialogs.show-clients.update-dialog.description")}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder="client-name"
                    useTranslate={{ placeholder: "public" }}
                    error={errors.name}
                    {...register("name")}
                />

                <Input placeholder="phone" useTranslate={{ placeholder: "public" }} error={errors.phone} {...register("phone")} />

                <Input
                    placeholder="bronze-to"
                    useTranslate={{ placeholder: "public" }}
                    error={errors.bronzeTo}
                    {...register("bronzeTo", { valueAsNumber: true })}
                />

                <Input
                    placeholder="silver-to"
                    useTranslate={{ placeholder: "public" }}
                    error={errors.silverTo}
                    {...register("silverTo", { valueAsNumber: true })}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                    {text("buttons.update")}
                </Button>
            </form>
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
