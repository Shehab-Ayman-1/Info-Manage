"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useDelete } from "@/hooks/api/useDelete";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";

type DeleteDialogProps = {
    productId: string;
};

export const DeleteDialog = ({ productId }: DeleteDialogProps) => {
    const { mutate, isPending } = useDelete(`/api/profile/product/${productId}`, ["products"]);
    const { type, onClose } = useModel();
    const { onReset } = useLists();

    const text = useTranslations();
    const router = useRouter();

    if (type !== "delete-profile") return;

    const onConfirm = () => {
        const onSuccess = () => {
            router.push("/");
            onReset(["products", "suppliers"]);
        };

        mutate(null, { onSuccess });
        onClose();
    };

    return (
        <DialogForm
            heading={text("dialogs.product-profile.delete-dialog.heading")}
            description={text("dialogs.product-profile.delete-dialog.description")}
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
