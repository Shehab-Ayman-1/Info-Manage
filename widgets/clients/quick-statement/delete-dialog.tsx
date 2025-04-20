"use client";
import { UseFormSetValue } from "react-hook-form";
import { useEffect } from "react";

import { useModel } from "@/hooks/useModel";

type DeleteDialogProps = {
    products: any[];
    setValue: UseFormSetValue<any>;
};

export const DeleteDialog = ({ products, setValue }: DeleteDialogProps) => {
    const { type, data } = useModel();

    useEffect(() => {
        if (type !== "quick-client-statement-model" || !data?.isDeleteAble) return;
        const newProducts = products.filter((product) => product.productId !== data.productId);
        setValue("products", newProducts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return null;
};

DeleteDialog.displayName = "DeleteDialog";
