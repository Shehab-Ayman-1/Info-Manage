import { Notify } from "@/components/header/icons/notifications";

export const subscriptionNotifies: Notify[] = [
    {
        _id: "premium",
        reason: "Premium Subscription",
        price: 200,
        process: "premium",
        method: "vodafone-cash",
        createdAt: new Date(),
    },
    {
        _id: "enterprise",
        reason: "EnterPrice Subscription",
        price: 200,
        process: "enterprise",
        method: "vodafone-cash",
        createdAt: new Date(),
    },
];
