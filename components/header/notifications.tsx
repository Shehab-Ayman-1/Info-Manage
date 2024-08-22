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
    process: "deposit" | "withdraw" | "premium" | "enterprise";
    method: "cash" | "visa" | "Vodafone Cash";
    createdAt: Date;
};

const defaultNotifies: NotificationsProps[] = [
    {
        _id: "Premium",
        reason: "Premium Subscription",
        price: 200,
        process: "premium",
        method: "Vodafone Cash",
        createdAt: new Date(),
    },
    {
        _id: "EnterPrice",
        reason: "EnterPrice Subscription",
        price: 200,
        process: "enterprise",
        method: "Vodafone Cash",
        createdAt: new Date(),
    },
];

export const Notifications = () => {
    const { additionalSubscription } = useSubscription(["premium"]);
    const subscriptions = defaultNotifies.filter((notify) => notify.process !== additionalSubscription);

    const textStyle = "text-sm font-bold text-amber-800 dark:text-amber-300";

    return (
        <Popover>
            <PopoverTrigger className="relative">
                <span className="absolute -top-1 right-0 h-3 w-3 rounded-full bg-red-500" />
                <BellIcon className="hover:text-slate-500" />
            </PopoverTrigger>

            <PopoverContent className="bg-gradient w-auto md:min-w-96">
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
            </PopoverContent>
        </Popover>
    );
};

Notifications.displayName = "Notifications";
