"use client";
import { useDelete } from "@/hooks/api/useDelete";
import { useModel } from "@/hooks/useModel";
import { useTranslations } from "next-intl";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";

type DeleteDialogProps = {};

export const DeleteDialog = ({}: DeleteDialogProps) => {
    const { mutate, isPending } = useDelete(`/api/suppliers/invoices`, ["supplier-invoices", "products"]);
    const { type, data, onClose } = useModel();
    const text = useTranslations();

    if (type !== "delete-model") return;

    const onConfirm = () => {
        mutate(data, { onSuccess: onClose });
    };

    return (
        <DialogForm
            heading={text("dialogs.supplier-invoices.delete-dialog.heading")}
            description={text("dialogs.supplier-invoices.delete-dialog.description")}
        >
            <div className="flex-end">
                <Button type="button" variant="outline" className="w-fit text-black dark:text-white" onClick={onClose}>
                    {text("buttons.cancel")}
                </Button>
                <Button type="button" variant="destructive" className="w-fit" onClick={onConfirm} disabled={isPending}>
                    {text("buttons.confirm")}
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteDialog.displayName = "DeleteDialog";
