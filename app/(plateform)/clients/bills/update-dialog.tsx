"use client";
import { useTranslations } from "next-intl";

import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";

type UpdateDialogProps = {};

export const UpdateDialog = ({}: UpdateDialogProps) => {
    const { type } = useModel();
    const text = useTranslations();

    if (type !== "edit-bill-model") return;

    return (
        <DialogForm
            heading={text("dialogs.client-bills.update-dialog.heading")}
            description={text("dialogs.client-bills.update-dialog.description")}
        >
            UpdateDialog
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
