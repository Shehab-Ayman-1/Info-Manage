"use client";
import { useTranslations } from "next-intl";

import { useDelete } from "@/hooks/api/useDelete";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";

type DeleteItemByRequestType = {
    apiUrl: string;
    dialogType: string;
    queryKeys: string[];
    navigate?: string;
    requestKeys: { senderId: string; dataId: string };
};

export const DeleteItemByRequest = ({ apiUrl, queryKeys, dialogType, navigate, requestKeys }: DeleteItemByRequestType) => {
    const { mutate, isPending } = useDelete(apiUrl, queryKeys);
    const { type, data, onClose } = useModel();
    const text = useTranslations("");
    const router = useRouter();

    if (type !== dialogType) return;

    const onClick = () => {
        mutate(
            { [requestKeys.senderId]: data?.[requestKeys.dataId] },
            {
                onSuccess: () => {
                    onClose();
                    navigate && router.push(navigate);
                },
            },
        );
    };

    return (
        <DialogForm heading={text("widgets.delete-dialog.heading")} description={text("widgets.delete-dialog.description")}>
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

DeleteItemByRequest.displayName = "DeleteItemByRequest";
