"use client";
import { useOrganization } from "@clerk/nextjs";
import { AdditionalSubscription, Subscription } from "@/constants";

export const useSubscription = (
    additionalSubscriptions: AdditionalSubscription[] = [],
    subscriptions: Subscription[] = ["basic"],
) => {
    const { organization } = useOrganization();

    const meta = organization?.publicMetadata;
    const subscription = meta?.subscription as Subscription;
    const isSubscribe = subscriptions.includes(subscription);

    const addSubscriptions = meta?.additionalSubscriptions as AdditionalSubscription[];
    const additionalSubscriptionExpiresAt = meta?.additionalSubscriptionExpiresAt as string;

    const now = new Date().getTime();
    const isExpires = now > new Date(additionalSubscriptionExpiresAt).getTime();

    const subscriptionExist = additionalSubscriptions.some((sub) => addSubscriptions?.includes(sub));
    const isAdditionalSubscribe = !isExpires && subscriptionExist;

    return {
        subscription,
        isSubscribe: isSubscribe && subscription !== "unsubscribe",
        additionalSubscription: addSubscriptions,
        isAdditionalSubscribe: isAdditionalSubscribe,
    };
};
