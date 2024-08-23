"use client";
import { useRouter } from "next/navigation";

import { useDelete } from "@/hooks/api/useDelete";
import { useLists } from "@/hooks/data/useLists";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";

type DeleteDialogProps = {
    productId: string;
};

export const DeleteDialog = ({ productId }: DeleteDialogProps) => {
    const { mutate, isPending } = useDelete(`/api/profile/products/${productId}`, ["market", "store"]);
    const router = useRouter();

    const { type, onClose } = useModel();
    const { onReset } = useLists();

    if (type !== "delete-profile") return;

    const onConfirm = () => {
        mutate(
            {},
            {
                onSuccess: () => {
                    router.push("/");
                    onReset(["products", "suppliers"]);
                },
            },
        );
        onClose();
    };

    return (
        <DialogForm
            heading="Delete Product"
            description="Are You Sure, You Can't Undo This Product After Deleting"
            className="text-black dark:text-white"
        >
            <div className="flex-end">
                <Button variant="outline" className="w-fit text-black dark:text-white" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="destructive" className="w-fit" onClick={onConfirm} disabled={isPending}>
                    Confirm
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteDialog.displayName = "DeleteDialog";
