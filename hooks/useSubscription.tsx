"use client";
import { useOrganization } from "@clerk/nextjs";
import { AdditionalSubscription, Subscription } from "@/constants";

/* Subscription:
    - undefined -> For Life.
    - Expire Date -> Suspend After Expire Date.

    Additional Subscriptions:
    - empty: Just Basic Subscription.
    - Premium: Open For Premium Pages.
    - Enterprise: Open For Enterprise Pages.
    - Premium & Enterprise: Open For Premium OR Enterprise.
*/

const now = new Date().getTime();
export const useSubscription = (allowedAdditionals: AdditionalSubscription[] = [], subscriptions: Subscription[] = ["basic"]) => {
    const { organization } = useOrganization();

    const meta = organization?.publicMetadata;

    // Main Subscription
    const main = meta?.subscription as Subscription;
    const mainDate = meta?.subscriptionExpiresAt as string;

    // Additionals Subscriptions
    const additionals = meta?.additionalSubscriptions as AdditionalSubscription[];
    const additionalsDate = meta?.additionalSubscriptionExpiresAt as string;

    // Expires
    const isMainExpires = now > new Date(mainDate).getTime();
    const isAdditionalsExpires = now > new Date(additionalsDate).getTime();

    // Exists
    const isAdditionalsExists = additionals?.some((allowed) => allowedAdditionals?.includes(allowed));
    const isMainExists = subscriptions.includes(main);

    // Is Subscribe
    const isSubscribe = !isMainExpires && isMainExists;
    const isAdditionalSubscribe = (!isAdditionalsExpires && isAdditionalsExists) || !allowedAdditionals.length;

    return {
        subscription: main,
        isSubscribe: isSubscribe && main !== "unsubscribe",
        additionalSubscription: additionals,
        isAdditionalSubscribe,
    };
};
