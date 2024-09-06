"use client";
import { useTranslations } from "next-intl";

import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";
import { useUpdate } from "@/hooks/api/useUpdate";

type RequestType = {
    productId: string;
};

export const RestoreDialog = () => {
    const { mutate, isPending } = useUpdate<RequestType>("/api/products/trash", ["trash-products"]);
    const { type, data, onClose } = useModel();
    const text = useTranslations();

    if (type !== "restore-model") return;

    const onClick = () => {
        if (!data?.productId) return;
        mutate({ productId: data.productId }, { onSuccess: onClose });
    };

    return (
        <DialogForm
            heading={text("dialogs.trash-products.restore-dialog.heading")}
            description={text("dialogs.trash-products.restore-dialog.description")}
        >
            <div className="flex-end">
                <Button type="button" variant="outline" className="text-black dark:text-white" onClick={onClose}>
                    {text("buttons.cancel")}
                </Button>
                <Button type="button" variant="destructive" disabled={isPending} onClick={onClick}>
                    {text("buttons.confirm")}
                </Button>
            </div>
        </DialogForm>
    );
};

RestoreDialog.displayName = "RestoreDialog";
