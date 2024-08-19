"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type PayDialogProps = {};

const schema = z.object({
    amount: z.number().int().min(1),
});

export const PayDialog = ({}: PayDialogProps) => {
    const { formState, register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { type, data, onClose } = useModel();

    const { mutate, isPending } = useUpdate(`/api/show/supplier-debts/${data?.debtId}`, ["debts"]);
    const { errors } = formState;

    if (type !== "pay-model") return;

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        const { amount } = values as z.infer<typeof schema>;
        mutate({ amount }, { onSuccess: onClose });
    };

    return (
        <DialogForm heading="Pay Amount" description="Make New Payment Transaction">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="number"
                    placeholder="Payment Amount"
                    error={errors?.amount}
                    {...register("amount", { valueAsNumber: true })}
                />
                <div className="flex-end">
                    <Button type="button" variant="outline" className="text-black dark:text-white" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        Confirm
                    </Button>
                </div>
            </form>
        </DialogForm>
    );
};

PayDialog.displayName = "PayDialog";
