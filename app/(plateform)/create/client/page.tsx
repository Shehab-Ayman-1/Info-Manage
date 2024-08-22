"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { ClientCreateSchema, createSchema } from "@/app/api/create/clients/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { useCreate } from "@/hooks/api/useCreate";
import { Input } from "@/ui/input";
import { useOrganization } from "@clerk/nextjs";
import { useEffect } from "react";

type ClientProps = {};

const Client = ({}: ClientProps) => {
    const { formState, register, setValue, watch, handleSubmit } = useForm({ resolver: zodResolver(createSchema) });
    const { mutate, isPending } = useCreate<ClientCreateSchema>("/api/create/clients", ["clients"]);
    const { organization } = useOrganization();

    const router = useRouter();
    const { errors } = formState;

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
            <CardForm heading="New Client" submitText="Create" disabled={isPending}>
                <Input placeholder="Client Name" error={errors?.name} {...register("name")} />
                <Input type="number" placeholder="Phone Number" error={errors?.phone} {...register("phone")} />

                <div className="flex-between !flex-nowrap">
                    <Input type="number" name="bronzeFrom" placeholder="From: ( 0 )" disabled />
                    <Input
                        type="number"
                        placeholder="To:"
                        error={errors?.bronzeTo}
                        {...register("bronzeTo", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between !flex-nowrap">
                    <Input type="number" name="silverFrom" placeholder="From:" value={bronzeTo} disabled />
                    <Input
                        type="number"
                        placeholder="To:"
                        error={errors?.silverTo}
                        {...register("silverTo", { valueAsNumber: true })}
                    />
                </div>

                <div className="flex-between !flex-nowrap">
                    <Input type="number" name="goldFrom" placeholder="From:" value={silverTo} disabled />
                    <Input name="goldFrom" placeholder="To: ( Un Limited )" disabled />
                </div>
            </CardForm>
        </form>
    );
};

Client.displayName = "Client";
export default Client;
