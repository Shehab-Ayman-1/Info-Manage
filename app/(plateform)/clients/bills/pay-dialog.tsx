"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type PayDialogProps = {};

const schema = z.object({
    amount: z.number().min(1),
});

export const PayDialog = ({}: PayDialogProps) => {
    const { formState, register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { type, data, onClose } = useModel();
    const text = useTranslations();

    const { mutate, isPending } = useUpdate(`/api/profile/client/${data?.billId}`, ["client-bills"]);
    const { errors } = formState;

    if (type !== "pay-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        const { amount } = values as z.infer<typeof schema>;
        mutate({ amount }, { onSuccess: onClose });
    };

    return (
        <DialogForm
            heading={text("dialogs.client-bills.payment-dialog.heading")}
            description={text("dialogs.client-bills.payment-dialog.description")}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="number"
                    placeholder="payment-amount"
                    useTranslate={{ placeholder: "dialogs.client-bills.payment-dialog" }}
                    error={errors?.amount}
                    {...register("amount", { valueAsNumber: true })}
                />
                <div className="flex-end">
                    <Button type="button" variant="outline" className="text-black dark:text-white" onClick={onClose}>
                        {text("buttons.cancel")}
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {text("buttons.confirm")}
                    </Button>
                </div>
            </form>
        </DialogForm>
    );
};

PayDialog.displayName = "PayDialog";
