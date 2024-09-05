"use client";
import { useTranslations } from "next-intl";

import { useDelete } from "@/hooks/api/useDelete";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";

export const DeleteDialog = () => {
    const { mutate, isPending } = useDelete("/api/clients", ["clients"]);
    const { type, data, onClose } = useModel();
    const text = useTranslations("");

    if (type !== "delete-model") return;

    const onClick = () => {
        mutate({ clientId: data.clientId }, { onSuccess: onClose });
    };

    return (
        <DialogForm
            heading={text("dialogs.show-clients.delete-dialog.heading")}
            description={text("dialogs.show-clients.delete-dialog.description")}
        >
            <div className="flex-end">
                <Button type="button" variant="outline" className="text-black dark:text-white" onClick={onClose}>
                    {text("buttons.cancel")}
                </Button>
                <Button type="button" variant="destructive" onClick={onClick} disabled={isPending}>
                    {text("buttons.confirm")}
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteDialog.displayName = "DeleteDialog";
