"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useCreate } from "@/hooks/api/useCreate";

import { CreateLockerSchema, createSchema } from "@/app/api/finances/locker/schema";
import { lockerMethods, methods } from "@/constants/statements";
import { CardForm } from "@/components/page-structure/CardForm";
import { ComboBox } from "@/components/ui/comboBox";
import { Input } from "@/ui/input";

type LockerProps = {};

const Locker = ({}: LockerProps) => {
    const { formState, register, setValue, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(createSchema) });
    const { mutate, isPending } = useCreate("/api/finances/locker", ["transactions"]);

    const { isSubmitted, errors } = formState;
    const router = useRouter();
    const text = useTranslations();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = data as CreateLockerSchema;
        mutate(values, { onSuccess: () => router.push("/finances/transactions") });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardForm heading={text("pages.locker.heading")} submitText={text("buttons.submit")} disabled={isPending}>
                <div className="flex-between">
                    <Input label="reason" useTranslate={{ label: "table" }} error={errors?.reason} {...register("reason")} />
                    <Input
                        type="number"
                        label="price"
                        useTranslate={{ label: "public" }}
                        error={errors?.price}
                        {...register("price", { valueAsNumber: true })}
                    />
                </div>
                <div className="flex-between">
                    <ComboBox
                        label="process"
                        name="process"
                        useTranslate={{ label: "public", name: "public", trigger: "pages.locker", item: "pages.locker" }}
                        error={errors?.process}
                        items={lockerMethods}
                        isSubmitted={isSubmitted}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                    <ComboBox
                        label="method"
                        name="method"
                        useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                        error={errors?.method}
                        items={methods}
                        isSubmitted={isSubmitted}
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
