"use client";
import { useDelete } from "@/hooks/api/useDelete";
import { useModel } from "@/hooks/useModel";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";

export const DeleteBillDialog = () => {
    const { mutate, isPending } = useDelete("/api/clients/statements/restore", []);
    const { type, data, onClose } = useModel();

    const text = useTranslations();
    const router = useRouter();

    if (type !== "delete-bill-model") return;

    const onConfirm = () => {
        const onSuccess = () => {
            onClose();
            router.push("/");
        };
        mutate({ billBarcode: data.billBarcode }, { onSuccess });
    };

    return (
        <DialogForm
            heading={text("dialogs.restore-client-statement.delete-dialog.heading")}
            description={text("dialogs.restore-client-statement.delete-dialog.description")}
        >
            <div className="flex-end">
                <Button variant="outline" className="w-fit text-black dark:text-white" onClick={onClose}>
                    {text("buttons.cancel")}
                </Button>
                <Button variant="destructive" className="w-fit" disabled={isPending} onClick={onConfirm}>
                    {text("buttons.confirm")}
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteBillDialog.displayName = "DeleteBillDialog";
