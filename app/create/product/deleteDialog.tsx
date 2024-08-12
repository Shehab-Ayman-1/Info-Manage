"use client";
import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";
import { Dispatch, SetStateAction } from "react";
import { ProductType } from "./schema";

type DeleteDialogProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const DeleteDialog = ({ setProducts }: DeleteDialogProps) => {
    const { type, data, onClose } = useModel();
    if (type !== "delete-model") return;

    const onClick = () => {
        setProducts((products) => products.filter((product) => product?.randomId !== data.productId));
        onClose();
    };

    return (
        <DialogForm heading="Delete Product" description="After You Delete The Products, You Will Lose It.">
            <div className="flex-end">
                <Button variant="outline" className="text-black dark:text-white">
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onClick}>
                    Confirm
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteDialog.displayName = "DeleteDialog";
