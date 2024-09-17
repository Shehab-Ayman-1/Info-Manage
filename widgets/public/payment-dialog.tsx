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

const schema = z.object({
    amount: z.number().min(1),
});

type PaymentDialogType = {
    apiUrl: string;
    dataId: string;
    dialogType: string;
    queryKeys: string[];
};

export const PaymentDialog = ({ apiUrl, dataId, dialogType, queryKeys }: PaymentDialogType) => {
    const { formState, register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { type, data, onClose } = useModel();
    const text = useTranslations();

    const { mutate, isPending } = useUpdate(`${apiUrl}/${data?.[dataId]}`, queryKeys);
    const { errors } = formState;

    if (type !== dialogType) return;

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        const { amount } = values as z.infer<typeof schema>;
        mutate({ amount }, { onSuccess: onClose });
    };

    return (
        <DialogForm heading={text("widgets.payment-dialog.heading")} description={text("widgets.payment-dialog.description")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="number"
                    placeholder="payment-amount"
                    useTranslate={{ placeholder: "public" }}
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

PaymentDialog.displayName = "PaymentDialog";
