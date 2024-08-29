import { useDelete } from "@/hooks/api/useDelete";
import { useModel } from "@/hooks/useModel";

import { DialogForm } from "@/components/ui/dialog";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";

export const DeleteBillDialog = () => {
    const { mutate, isPending } = useDelete("/api/clients/statements/restore", []);
    const { type, data, onClose } = useModel();
    const router = useRouter();
    if (type !== "delete-bill-model") return;

    const onConfirm = () => {
        const onSuccess = () => {
            onClose();
            router.push("/");
        };
        mutate({ billBarcode: data.billBarcode }, { onSuccess });
    };

    return (
        <DialogForm heading="Delete Bill" description="Are You Sure, You Can't Undo This Bill After Deleting">
            <div className="flex-end">
                <Button variant="outline" className="w-fit text-black dark:text-white" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="destructive" className="w-fit" disabled={isPending} onClick={onConfirm}>
                    Confirm
                </Button>
            </div>
        </DialogForm>
    );
};

DeleteBillDialog.displayName = "DeleteBillDialog";
