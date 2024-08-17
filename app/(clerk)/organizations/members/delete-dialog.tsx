"use client";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type DeleteDialogProps = {};

export const DeleteDialog = ({}: DeleteDialogProps) => {
    const { type, data, onClose } = useModel();
    const { organization } = useOrganization();

    if (type !== "delete-model") return;

    const onSubmit = async () => {
        try {
            await organization?.removeMember(data.userId);
            window.location.reload();
        } catch (error) {
            toast.error("This User Can't Be Deleted.");
        }
    };

    return (
        <DialogForm heading="Delete User" description="You Can't Undo This Action After Deleting">
            <div className="flex-end">
                <Button variant="outline" className="text-black dark:text-white" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onSubmit}>
                    Confirm
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteDialog.displayName = "DeleteDialog";
