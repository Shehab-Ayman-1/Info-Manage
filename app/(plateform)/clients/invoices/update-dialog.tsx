"use client";
import { useTranslations } from "next-intl";

import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";

type UpdateDialogProps = {};

export const UpdateDialog = ({}: UpdateDialogProps) => {
    const { type } = useModel();
    const text = useTranslations();

    if (type !== "edit-invoice-model") return;

    return (
        <DialogForm
            heading={text("dialogs.client-invoices.update-dialog.heading")}
            description={text("dialogs.client-invoices.update-dialog.description")}
        >
            UpdateDialog
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
