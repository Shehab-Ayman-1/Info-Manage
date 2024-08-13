"use client";
import { useOrganization } from "@clerk/nextjs";
import { Subscription } from "@/constants";

export const useSubscription = (subscriptions: Subscription[]) => {
    const { organization } = useOrganization();
    const metadata = organization?.publicMetadata;

    const orgSubscription = metadata?.subscription as Subscription;
    const isSubscribe = subscriptions.includes(orgSubscription);

    return { orgSubscription, isSubscribe };
};
