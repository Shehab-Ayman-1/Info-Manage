"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formatDate } from "date-fns";

import { noOfMonths, subscriptions, additionalSubscription } from "@/constants";
import { useUpdate } from "@/hooks/api/useUpdate";

import { configsSchema, EditConfigsSchema } from "@/app/api/organizations/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { Input } from "@/ui/input";

const Configs = () => {
    const { formState, register, setValue, clearErrors, handleSubmit } = useForm({
        resolver: zodResolver(configsSchema.omit({ organizationId: true })),
    });
    const { user } = useUser();

    const { mutate, isPending } = useUpdate<EditConfigsSchema>("/api/organizations");
    const { organization } = useOrganization();

    const { errors } = formState;
    if (!organization) return;

    const onSubmit = (data: any) => {
        const publicMetadata = data as EditConfigsSchema;
        mutate({ ...publicMetadata, organizationId: organization.id });
    };

    const isMe = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_EMAIL;
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
                    <ComboBox
                        label="Remove Unnecessary Data After"
                        name="removeUnnecessaryData"
                        setValue={setValue}
                        items={noOfMonths}
                        error={errors.removeUnnecessaryData}
                        clearErrors={clearErrors}
                        defaultValue={organization?.publicMetadata.removeUnnecessaryData as string}
                    />
                    <ComboBox
                        label="Refresh Client Purchases After"
                        name="refreshClientsPurchases"
                        setValue={setValue}
                        items={noOfMonths}
                        error={errors.refreshClientsPurchases}
                        clearErrors={clearErrors}
                        defaultValue={organization?.publicMetadata.refreshClientsPurchases as string}
                    />
                </div>

                {isMe && (
                    <ComboBox
                        label="Subscription"
                        name="subscription"
                        items={subscriptions}
                        error={errors.subscription}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        defaultValue={organization?.publicMetadata.subscription as string}
                    />
                )}

                {isMe && (
                    <div className="flex-between">
                        <ComboBox
                            label="Additional Subscription"
                            name="additionalSubscription"
                            items={additionalSubscription}
                            error={errors.additionalSubscription}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            defaultValue={organization?.publicMetadata.additionalSubscription as string}
                        />
                        <Input
                            type="date"
                            error={errors.additionalSubscriptionExpiresAt}
                            {...register("additionalSubscriptionExpiresAt", {
                                valueAsDate: true,
                                value: formatDate(
                                    new Date(organization?.publicMetadata.additionalSubscriptionExpiresAt as string),
                                    "yyyy-MM-dd",
                                ),
                            })}
                        />
                    </div>
                )}

                <SubmitButton text="Update" isPending={isPending} />
            </form>
        </CardForm>
    );
};

Configs.displayName = "Configs";
export default Configs;
