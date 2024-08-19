"use client";
import { useDelete } from "@/hooks/api/useDelete";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";

type DeleteDialogProps = {};

export const DeleteDialog = ({}: DeleteDialogProps) => {
    const { mutate, isPending } = useDelete(`/api/show/client-bills`, ["bills", "market"]);
    const { type, data, onClose } = useModel();
    if (type !== "delete-model") return;

    const onConfirm = () => {
        mutate(data, { onSuccess: onClose });
    };

    return (
        <DialogForm heading="Delete Bill" description="Are You Sure, You Can't Undo This Bill After Deleting">
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
