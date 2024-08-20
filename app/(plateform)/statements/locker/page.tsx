"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useCreate } from "@/hooks/api/useCreate";

import { CreateLockerSchema, createSchema } from "@/app/api/statements/locker/schema";
import { lockerMethods, methods } from "@/constants/statements";
import { CardForm } from "@/components/page-structure/CardForm";
import { ComboBox } from "@/components/ui/comboBox";
import { Input } from "@/ui/input";

type LockerProps = {};

const Locker = ({}: LockerProps) => {
    const { formState, register, setValue, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(createSchema) });
    const { mutate, isPending } = useCreate("/api/statements/locker", ["transactions"]);

    const { errors } = formState;
    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as CreateLockerSchema;
        mutate(values, { onSuccess: () => router.push("/") });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardForm heading="Withdraw OR Deposit" submitText="Submit" disabled={isPending}>
                <div className="flex-between">
                    <Input placeholder="Reason" error={errors?.reason} {...register("reason")} />
                    <Input
                        type="number"
                        placeholder="Price"
                        error={errors?.price}
                        {...register("price", { valueAsNumber: true })}
                    />
                </div>
                <div className="flex-between">
                    <ComboBox
                        label="Process"
                        name="process"
                        error={errors?.process}
                        items={lockerMethods}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                    <ComboBox
                        label="Method"
                        name="method"
                        error={errors?.method}
                        items={methods}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                </div>
            </CardForm>
        </form>
    );
};

Locker.displayName = "Locker";
export default Locker;
