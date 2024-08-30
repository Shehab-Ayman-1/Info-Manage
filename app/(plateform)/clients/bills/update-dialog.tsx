import { DialogForm } from "@/components/ui/dialog";

type UpdateDialogProps = {};

export const UpdateDialog = ({}: UpdateDialogProps) => {
    return (
        <DialogForm heading="Update Client Bill" description="You Can't Undo Any Change On The Bill">
            UpdateDialog
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
