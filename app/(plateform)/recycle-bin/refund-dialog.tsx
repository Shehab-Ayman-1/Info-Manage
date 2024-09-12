"use client";
import { useTranslations } from "next-intl";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";

type RequestType = {
    _id: string;
    type: "client" | "supplier" | "product";
};

export const RefundDialog = () => {
    const { mutate, isPending } = useUpdate<RequestType>("/api/recycle-bin", ["recycle-bin"]);
    const { type, data, onClose } = useModel();
    const { onReset } = useLists();
    const text = useTranslations();

    if (type !== "refund-model") return;

    const onClick = () => {
        if (!data?._id || !data?.type) return;
        mutate(data, {
            onSuccess: () => {
                onClose();
                // @ts-ignore
                onReset([`${data.type}s`]);
            },
        });
    };

    return (
        <DialogForm
            heading={text("dialogs.trash.refund-dialog.heading")}
            description={text("dialogs.trash.refund-dialog.description")}
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

RefundDialog.displayName = "RefundDialog";
