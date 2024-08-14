"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useModel } from "@/hooks/useModel";
import { ProductType } from "./index";

type DeleteDialogProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const DeleteDialog = ({ setProducts }: DeleteDialogProps) => {
    const { type, data } = useModel();

    useEffect(() => {
        if (type !== "update-products-model" || !data?.isDeletedModel) return;
        setProducts((products) => products.filter((product: any) => product._id !== data.productId));
    }, [type, data, setProducts]);

    return null;
};

DeleteDialog.displayName = "DeleteDialog";
