"use client";
import { DialogForm } from "@/components/ui/dialog";
import { useDelete } from "@/hooks/api/useDelete";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

export const DeleteDialog = () => {
    const { mutate, isPending } = useDelete("/api/show/clients", ["clients"]);
    const { type, data, onClose } = useModel();
    if (type !== "delete-model") return;

    const onClick = () => {
        mutate({ clientId: data.clientId }, { onSuccess: onClose });
    };

    return (
        <DialogForm heading="Delete Product" description="After You Delete The Products, You Will Lose This Client Forever.">
            <div className="flex-end">
                <Button variant="outline" className="text-black dark:text-white" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onClick} disabled={isPending}>
                    Confirm
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteDialog.displayName = "DeleteDialog";
