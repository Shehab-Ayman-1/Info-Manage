"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formatDate } from "date-fns";

import { noOfMonths, subscriptions, additionalSubscription } from "@/constants";
import { useUpdate } from "@/hooks/api/useUpdate";

import { configsSchema, EditConfigsSchema } from "@/app/api/organizations/configs/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { SubmitButton } from "@/components/public/submit-btn";
import { ComboBox } from "@/components/ui/comboBox";
import { Input } from "@/ui/input";

const Configs = () => {
    const resolver = zodResolver(configsSchema.omit({ organizationId: true }));
    const { formState, watch, register, setValue, clearErrors, handleSubmit } = useForm({ resolver });
    const { mutate, isPending } = useUpdate<EditConfigsSchema>("/api/organizations/configs");
    const { errors } = formState;

    const { organization } = useOrganization();
    const { user } = useUser();

    const additionalSubscriptions = watch("additionalSubscriptions");

    if (!organization) return;

    const onAdditionalChange = (value: string) => {
        if (value && typeof value !== "string") return setValue("additionalSubscriptions", value); // array
        if (value === "unsubscribe") return setValue("additionalSubscriptions", []);
        if (additionalSubscriptions === undefined) return setValue("additionalSubscriptions", []);

        const newValues = additionalSubscriptions.includes(value)
            ? additionalSubscriptions.filter((sub: string) => sub !== value)
            : additionalSubscriptions.concat(value).filter((sub: string) => sub);

        setValue("additionalSubscriptions", newValues);
    };

    const onSubmit = (data: any) => {
        const publicMetadata = data as EditConfigsSchema;
        mutate({ ...publicMetadata, organizationId: organization.id });
    };

    const subscriptionExpiresAtMetadata = organization?.publicMetadata?.subscriptionExpiresAt;
    const additionalExpiresAtMetadata = organization?.publicMetadata?.additionalSubscriptionExpiresAt;

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

                <h3 className="bg-gradient-light my-4 py-4 text-center font-bold text-primary sm:text-xl">Subscriptions</h3>

                {isMe && (
                    <div className="flex-between">
                        <ComboBox
                            label="Subscription"
                            name="subscription"
                            items={subscriptions}
                            error={errors.subscription}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            defaultValue={organization?.publicMetadata.subscription as string}
                        />
                        <Input
                            type="date"
                            error={errors.subscriptionExpiresAt}
                            {...register("subscriptionExpiresAt", {
                                valueAsDate: true,
                                value:
                                    subscriptionExpiresAtMetadata &&
                                    formatDate(subscriptionExpiresAtMetadata as string, "yyyy-MM-dd"),
                            })}
                        />
                    </div>
                )}

                {isMe && (
                    <div className="">
                        <ComboBox
                            label={`Additional Subscription: ${additionalSubscriptions?.join(" | ")}`}
                            name="additionalSubscriptions"
                            items={additionalSubscription}
                            error={errors.additionalSubscription}
                            onChange={onAdditionalChange}
                            clearErrors={clearErrors}
                            defaultValue={organization?.publicMetadata.additionalSubscriptions as string}
                        />
                        <Input
                            type="date"
                            error={errors.additionalSubscriptionExpiresAt}
                            {...register("additionalSubscriptionExpiresAt", {
                                valueAsDate: true,
                                value:
                                    additionalExpiresAtMetadata &&
                                    formatDate(additionalExpiresAtMetadata as string, "yyyy-MM-dd"),
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
