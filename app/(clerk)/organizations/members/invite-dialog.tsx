"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { DialogForm } from "@/components/ui/dialog";
import { useModel } from "@/hooks/useModel";
import { roles } from "@/constants";
import { Input } from "@/ui/input";

const schema = z.object({
    emailAddress: z.string().email().min(1),
    role: z.enum(["admin", "member"]),
});

export const InviteDialog = () => {
    const { formState, register, setValue, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const { organization } = useOrganization();
    const { type, onClose } = useModel();
    const { isSubmitted, errors } = formState;

    if (type !== "invite-model") return;

    const onSubmit = async ({ emailAddress, role }: any) => {
        try {
            await organization?.inviteMember({ emailAddress, role: `org:${role}` });
            onClose();
        } catch (error) {
            toast.error("Can't Invite This User.");
        }
    };

    return (
        <DialogForm heading="Invite Member" description="Invite All The Member Fields">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="email" placeholder="Email:" error={errors.emailAddress} {...register("emailAddress")} />
                <ComboBox
                    label="Role"
                    name="role"
                    items={roles}
                    error={errors.role}
                    isSubmitted={isSubmitted}
                    setValue={setValue}
                    clearErrors={clearErrors}
                />
                <SubmitButton text="Invite" isPending={false} />
            </form>
        </DialogForm>
    );
};

InviteDialog.displayName = "InviteDialog";
