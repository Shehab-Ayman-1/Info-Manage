"use client";
import { useAuth, useOrganization } from "@clerk/nextjs";

import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type LeaveDialogProps = {};

export const LeaveDialog = ({}: LeaveDialogProps) => {
    const { organization } = useOrganization();
    const { type, onClose } = useModel();
    const { userId } = useAuth();

    if (type !== "leave-model") return;

    const onConfirm = () => {
        organization?.removeMember(userId!);
    };

    return (
        <DialogForm heading="Leave Organization" description="You Can't Come Back After Leaving.">
            <div className="flex-end">
                <Button type="button" variant="outline" className="text-black dark:text-white" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="button" variant="destructive" onClick={onConfirm}>
                    Confirm
                </Button>
            </div>
        </DialogForm>
    );
};

LeaveDialog.displayName = "LeaveDialog";
