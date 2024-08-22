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

    const additionalSubscription = meta?.additionalSubscription as AdditionalSubscription;
    const additionalSubscriptionExpiresAt = meta?.additionalSubscriptionExpiresAt as string;

    const now = new Date().getTime();
    const isExpires = now > new Date(additionalSubscriptionExpiresAt).getTime();

    const isSubscribe = subscriptions.includes(subscription);
    const isAdditionalSubscribe = !isExpires && additionalSubscriptions.includes(additionalSubscription);

    return {
        subscription,
        isSubscribe: isSubscribe && subscription !== "unsubscribe",
        additionalSubscription,
        isAdditionalSubscribe: isAdditionalSubscribe,
    };
};
