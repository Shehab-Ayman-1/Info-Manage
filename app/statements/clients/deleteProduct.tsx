import { Dispatch, SetStateAction } from "react";

import { DialogForm } from "@/components/ui/dialog";
import { ProductType } from "./insertProducts";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type DeleteProductProps = {
    setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export const DeleteProduct = ({ setProducts }: DeleteProductProps) => {
    const { type, data, onClose } = useModel();
    if (type !== "delete-model") return;

    const onConfirm = () => {
        setProducts((products) => products.filter((product) => product.productId !== data.productId));
        onClose();
    };

    return (
        <DialogForm heading="Delete Bill" description="Are You Sure, You Can't Undo This Bill After Deleting">
            <div className="flex-end">
                <Button variant="outline" className="w-fit text-black dark:text-white" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="destructive" className="w-fit" onClick={onConfirm}>
                    Confirm
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteProduct.displayName = "DeleteProduct";
