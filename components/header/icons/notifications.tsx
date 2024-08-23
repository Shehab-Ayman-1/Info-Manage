"use client";
import { BellIcon, CircleFadingArrowUpIcon, Clock5Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Fragment } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useSubscription } from "@/hooks/useSubscription";
import { cn } from "@/utils/shadcn";

type NotificationsProps = {
    _id: string;
    reason: string;
    price: number;
    process: "premium" | "enterprise";
    method: "Vodafone Cash";
    createdAt: Date;
};

const notifies: NotificationsProps[] = [
    {
        _id: "premium",
        reason: "Premium Subscription",
        price: 200,
        process: "premium",
        method: "Vodafone Cash",
        createdAt: new Date(),
    },
    {
        _id: "enterprise",
        reason: "EnterPrice Subscription",
        price: 200,
        process: "enterprise",
        method: "Vodafone Cash",
        createdAt: new Date(),
    },
];

export const Notifications = () => {
    const { additionalSubscription } = useSubscription(["premium"]);
    const subscriptions =
        notifies?.length === additionalSubscription?.length
            ? []
            : notifies.filter((notify) => additionalSubscription?.some((sub) => sub !== notify.process));

    const textStyle = "text-sm font-bold text-amber-800 dark:text-amber-300";

    return (
        <Popover>
            <PopoverTrigger className="relative">
                {!!subscriptions.length && (
                    <span className="flex-center absolute -right-1 -top-2 block size-4 rounded-full bg-red-500 text-xs leading-none text-white">
                        {subscriptions.length}
                    </span>
                )}
                <BellIcon className="hover:text-slate-500" />
            </PopoverTrigger>

            <PopoverContent className="bg-gradient w-auto md:min-w-96" align="end">
                {subscriptions.map((notify) => (
                    <Fragment key={notify._id}>
                        <div className="flex-start cursor-pointer rounded-md px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600">
                            <CircleFadingArrowUpIcon className="size-8 !text-amber-500" />

                            <div className="">
                                <h3 className={textStyle}>{notify.reason}</h3>

                                <div className="flex-between">
                                    <p className={textStyle}>$ {notify.price}</p>
                                    <p className={textStyle}>{notify.process}</p>
                                    <p className={textStyle}>{notify.method}</p>
                                </div>

                                <div className={cn("flex-start text-slate-600 dark:text-slate-300", textStyle)}>
                                    <Clock5Icon className={cn("size-4", textStyle)} />
                                    <p>{formatDistanceToNow(notify.createdAt || Date.now())}</p>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))}

                {!subscriptions.length && <h3 className="">No Inbox Notifications.</h3>}
            </PopoverContent>
        </Popover>
    );
};

Notifications.displayName = "Notifications";
