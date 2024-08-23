"use client";
import { useOrganization } from "@clerk/nextjs";
import { AdditionalSubscription, Subscription } from "@/constants";

/* Subscription:
    - undefined -> For Life.
    - Expire Date -> Suspend After Expire Date.

    Additional Subscriptions:
    - empty: Just Basic Subscription.
    - Premium: Open Premium Pages.
    - Enterprise: Open Enterprise Pages.
    - Premium & Enterprise: Enter Both Premium & Enterprise Pages.
*/

const now = new Date().getTime();
export const useSubscription = (
    additionalSubscriptions: AdditionalSubscription[] = [],
    subscriptions: Subscription[] = ["basic"],
) => {
    const { organization } = useOrganization();

    const meta = organization?.publicMetadata;

    const main = meta?.subscription as Subscription;
    const mainDate = meta?.subscriptionExpiresAt as string;

    const additionals = meta?.additionalSubscriptions as AdditionalSubscription[];
    const additionalsDate = meta?.additionalSubscriptionExpiresAt as string;

    const isMainExpires = now > new Date(mainDate).getTime();
    const isAdditionalsExpires = now > new Date(additionalsDate).getTime();

    const isAdditionalsExists = additionalSubscriptions.some((sub) => additionals?.includes(sub));
    const isMainExists = subscriptions.includes(main);

    const isSubscribe = !isMainExpires && isMainExists;
    const isAdditionalSubscribe = (!isAdditionalsExpires && isAdditionalsExists) || !additionalSubscriptions.length;

    return {
        subscription: main,
        isSubscribe: isSubscribe && main !== "unsubscribe",
        additionalSubscription: additionals,
        isAdditionalSubscribe,
    };
};
