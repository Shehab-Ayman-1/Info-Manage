"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { ClientCreateSchema, createSchema } from "@/app/api/create/clients/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { useCreate } from "@/hooks/api/useCreate";
import { Input } from "@/ui/input";

type ClientProps = {};

const Client = ({}: ClientProps) => {
    const { formState, register, watch, handleSubmit } = useForm({ resolver: zodResolver(createSchema) });
    const { mutate, isPending } = useCreate<ClientCreateSchema>("/api/create/clients", ["clients"]);

    const router = useRouter();
    const { errors } = formState;

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

                <div className="bronze flex-between">
                    <h3 className="mt-4">Bronze:</h3>
                    <div className="flex-between !flex-nowrap">
                        <Input type="number" placeholder="From: ( 0 )" disabled />
                        <Input
                            type="number"
                            placeholder="To:"
                            error={errors?.bronzeTo}
                            {...register("bronzeTo", { valueAsNumber: true })}
                        />
                    </div>
                </div>

                <div className="silver flex-between">
                    <h3 className="mt-4">Silver:</h3>
                    <div className="flex-between !flex-nowrap">
                        <Input type="number" placeholder="From:" value={bronzeTo} disabled />
                        <Input
                            type="number"
                            placeholder="To:"
                            error={errors?.silverTo}
                            {...register("silverTo", { valueAsNumber: true })}
                        />
                    </div>
                </div>

                <div className="gold flex-between">
                    <h3 className="mt-4">Gold:</h3>
                    <div className="flex-between !flex-nowrap">
                        <Input type="number" placeholder="From:" value={silverTo} disabled />
                        <Input placeholder="To: ( Un Limited )" disabled />
                    </div>
                </div>
            </CardForm>
        </form>
    );
};

Client.displayName = "Client";
export default Client;
