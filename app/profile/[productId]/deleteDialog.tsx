"use client";
import { useRouter } from "next/navigation";

import { useDelete } from "@/hooks/api/useDelete";
import { useModel } from "@/hooks/useModel";
import { useLists } from "@/hooks/data/useLists";

import { DialogForm } from "@/components/dialog";
import { Button } from "@/ui/button";

type DeleteDialogProps = {
    productId: string;
};

const DeleteDialog = ({ productId }: DeleteDialogProps) => {
    const { mutate, isPending } = useDelete(`/api/profile/${productId}`, ["market", "store"]);
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
export default DeleteDialog;
