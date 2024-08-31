"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { ClientCreateSchema, createSchema } from "@/app/api/clients/add-client/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { useCreate } from "@/hooks/api/useCreate";
import { Input } from "@/ui/input";

type ClientProps = {};

const Client = ({}: ClientProps) => {
    const { formState, register, setValue, watch, handleSubmit } = useForm({ resolver: zodResolver(createSchema) });
    const { mutate, isPending } = useCreate<ClientCreateSchema>("/api/clients/add-client", ["clients"]);
    const { organization } = useOrganization();

    const text = useTranslations();
    const { errors } = formState;
    const router = useRouter();

    useEffect(() => {
        if (!organization) return;
        const { bronzeTo, silverTo } = organization.publicMetadata;

        setValue("bronzeTo", bronzeTo);
        setValue("silverTo", silverTo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as ClientCreateSchema;
        mutate(values, { onSuccess: () => router.push("/") });
    };

    const bronzeTo = watch("bronzeTo");
    const silverTo = watch("silverTo");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardForm heading={text("pages.add-new-client.heading")} submitText={text("buttons.create")} disabled={isPending}>
                <Input
                    placeholder="client-name"
                    useTranslate={{ placeholder: "public" }}
                    error={errors?.name}
                    {...register("name")}
                />
                <Input
                    type="number"
                    placeholder="phone"
                    useTranslate={{ placeholder: "public" }}
                    error={errors?.phone}
                    {...register("phone")}
                />

                <div className="flex-between !flex-nowrap">
                    <Input
                        type="number"
                        placeholder="bronze-from"
                        useTranslate={{ placeholder: "pages.add-new-client" }}
                        value=""
                        disabled
                    />
                    <Input
                        type="number"
                        placeholder="bronze-to"
                        useTranslate={{ placeholder: "pages.add-new-client" }}
                        error={errors?.bronzeTo}
                        {...register("bronzeTo", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between !flex-nowrap">
                    <Input
                        type="number"
                        placeholder="silver-from"
                        useTranslate={{ placeholder: "pages.add-new-client" }}
                        value={bronzeTo || ""}
                        disabled
                    />
                    <Input
                        type="number"
                        placeholder="silver-to"
                        useTranslate={{ placeholder: "pages.add-new-client" }}
                        error={errors?.silverTo}
                        {...register("silverTo", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between !flex-nowrap">
                    <Input
                        type="number"
                        placeholder="gold-from"
                        useTranslate={{ placeholder: "pages.add-new-client" }}
                        value={silverTo || ""}
                        disabled
                    />
                    <Input placeholder="gold-to" useTranslate={{ placeholder: "pages.add-new-client" }} disabled />
                </div>
            </CardForm>
        </form>
    );
};

Client.displayName = "Client";
export default Client;
