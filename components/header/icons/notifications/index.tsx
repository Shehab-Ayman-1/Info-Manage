"use client";
import { useEffect, useState } from "react";
import { BellIcon } from "lucide-react";

import { useSubscription } from "@/hooks/useSubscription";
import { useGet } from "@/hooks/api/useGet";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { subscriptionNotifies } from "@/constants";
import { NotifyLists } from "./notifyLists";

export type Notify = {
    _id: string;
    reason: string;
    price: number;
    process: "premium" | "enterprise";
    method: "cash" | "visa" | "vodafone-cash";
    createdAt: Date;
};

export const Notifications = () => {
    const { data, isPending } = useGet<Notify[]>("/api/notifications", ["notifications"]);
    const { additionalSubscription } = useSubscription(["premium"]);

    const [subscriptions, setSubscriptions] = useState<Notify[]>([]);

    useEffect(() => {
        setSubscriptions(() => {
            const subscriptionNotifiesLength = subscriptionNotifies?.length === additionalSubscription?.length;
            if (subscriptionNotifiesLength) return [];
            return subscriptionNotifies.filter((notify) => additionalSubscription?.some((sub) => sub !== notify.process));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [additionalSubscription]);

    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer">
                <div className="relative">
                    {!!subscriptions.length && (
                        <span className="flex-center absolute -right-1 -top-2 block size-4 rounded-full bg-red-500 text-xs leading-none text-white">
                            {subscriptions.length}
                        </span>
                    )}
                    <BellIcon className="hover:text-slate-500" />
                </div>
            </PopoverTrigger>

            <PopoverContent align="start" side="left" className="w-auto shadow-xl md:min-w-96">
                <NotifyLists data={subscriptions} />
                {!isPending && <NotifyLists data={data!} />}
            </PopoverContent>
        </Popover>
    );
};

Notifications.displayName = "Notifications";
