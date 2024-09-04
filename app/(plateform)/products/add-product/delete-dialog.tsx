"use client";
import type { Dispatch, SetStateAction } from "react";
import type { ProductType } from "./schema";
import { useTranslations } from "next-intl";

import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type DeleteDialogProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const DeleteDialog = ({ setProducts }: DeleteDialogProps) => {
    const { type, data, onClose } = useModel();
    const text = useTranslations();

    if (type !== "delete-model") return;

    const onClick = () => {
        setProducts((products) => products.filter((product) => product?.randomId !== data.productId));
        onClose();
    };

    return (
        <DialogForm
            heading={text("dialogs.add-product.delete-dialog.heading")}
            description={text("dialogs.add-product.delete-dialog.description")}
        >
            <div className="flex-end">
                <Button variant="outline" className="text-black dark:text-white" onClick={onClose}>
                    {text("buttons.cancel")}
                </Button>
                <Button variant="destructive" onClick={onClick}>
                    {text("buttons.confirm")}
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteDialog.displayName = "DeleteDialog";
