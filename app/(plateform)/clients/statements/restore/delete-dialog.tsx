"use client";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

import { DialogForm } from "@/components/ui/dialog";
import { ProductType } from "./insert-product";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type DeleteDialogProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const DeleteDialog = ({ setProducts }: DeleteDialogProps) => {
    const { type, data, onClose } = useModel();
    const text = useTranslations();
    if (type !== "delete-model") return;

    const onConfirm = () => {
        setProducts((products) => products.filter((product) => product.productId !== data.productId));
        onClose();
    };

    return (
        <DialogForm
            heading={text("dialogs.restore-client-statement.remove-dialog.heading")}
            description={text("dialogs.restore-client-statement.remove-dialog.description")}
        >
            <div className="flex-end">
                <Button type="button" variant="outline" className="w-fit text-black dark:text-white" onClick={onClose}>
                    {text("buttons.cancel")}
                </Button>
                <Button type="button" variant="destructive" className="w-fit" onClick={onConfirm}>
                    {text("buttons.confirm")}
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteDialog.displayName = "DeleteDialog";
