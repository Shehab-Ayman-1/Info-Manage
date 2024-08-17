import { useOrganization } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SubmitButton } from "@/components/public/submit-btn";
import { DialogForm } from "@/components/ui/dialog";
import { SelectBox } from "@/components/ui/select";
import { useModel } from "@/hooks/useModel";
import { roles } from "@/constants";

export const UpdateDialog = () => {
    const { formState, setValue, handleSubmit } = useForm();
    const { organization } = useOrganization();
    const { type, data } = useModel();

    const { errors, isLoading } = formState;
    if (type !== "edit-model") return;

    const onSubmit = async ({ role }: any) => {
        try {
            await organization?.updateMember({ role: `org:${role}`, userId: data.userId });
            window.location.reload();
        } catch (error) {
            toast.error("This User Can't Be Updated.");
        }
    };

    return (
        <DialogForm heading="Update Dialog" description="You Can't Undo You Updated Again">
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectBox label="Role" name="role" error={errors.role} items={roles} setValue={setValue} />
                <SubmitButton text="Update" isPending={isLoading} />
            </form>
        </DialogForm>
    );
};

UpdateDialog.displayName = "UpdateDialog";
