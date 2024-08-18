"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import { configsSchema, EditConfigsSchema } from "@/app/api/organizations/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { SelectBox } from "@/components/ui/select";
import { useUpdate } from "@/hooks/api/useUpdate";
import { noOfMonths } from "@/constants";
import { Input } from "@/ui/input";

const Configs = () => {
    const { formState, register, setValue, handleSubmit } = useForm({
        resolver: zodResolver(configsSchema.omit({ organizationId: true })),
    });
    const { mutate, isPending } = useUpdate<EditConfigsSchema>("/api/organizations");
    const { organization } = useOrganization();
    const { errors } = formState;

    if (!organization) return;

    const onSubmit = (data: any) => {
        const publicMetadata = data as EditConfigsSchema;
        mutate({ ...publicMetadata, organizationId: organization.id });
    };

    return (
        <CardForm heading="Configs">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-between">
                    <Input
                        type="number"
                        placeholder="Bronze To"
                        error={errors.bronzeTo}
                        {...register("bronzeTo", { valueAsNumber: true, value: organization?.publicMetadata.bronzeTo })}
                    />
                    <Input
                        type="number"
                        placeholder="Silver To"
                        error={errors.silverTo}
                        {...register("silverTo", { valueAsNumber: true, value: organization?.publicMetadata.silverTo })}
                    />
                </div>

                <div className="flex-between">
                    <SelectBox
                        label="Remove After"
                        name="removeUnnecessaryData"
                        setValue={setValue}
                        items={noOfMonths}
                        error={errors.removeUnnecessaryData}
                        defaultValue={organization?.publicMetadata.removeUnnecessaryData as string}
                    />
                    <SelectBox
                        label="Refresh After"
                        name="refreshClientsPurchases"
                        setValue={setValue}
                        items={noOfMonths}
                        error={errors.refreshClientsPurchases}
                        defaultValue={organization?.publicMetadata.refreshClientsPurchases as string}
                    />
                </div>

                <SubmitButton text="Update" isPending={isPending} />
            </form>
        </CardForm>
    );
};

Configs.displayName = "Configs";
export default Configs;
