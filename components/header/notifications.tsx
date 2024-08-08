"use client";
import { BellIcon, Clock5Icon, CreditCardIcon, HandCoinsIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Fragment } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useGet } from "@/hooks/api/useGet";
import { cn } from "@/utils/shadcn";

type NotificationsProps = {
    _id: string;
    reason: string;
    price: number;
    process: "deposit" | "withdraw";
    method: "cash" | "visa";
    createdAt: Date;
};

export const Notifications = () => {
    const { data, isPending, error } = useGet<NotificationsProps>("/api/notifications", ["notifications"]);
    if (isPending || error) return;

    const textStyle = (process: "deposit" | "withdraw") =>
        cn(
            "text-lg font-bold",
            process === "deposit" ? "text-green-800 dark:text-green-300" : "text-rose-800 dark:text-rose-300",
        );

    return (
        <Popover>
            <PopoverTrigger>
                <BellIcon className="hover:text-slate-500" />
            </PopoverTrigger>

            <PopoverContent className="bg-gradient w-auto md:min-w-96">
                {data.map((notify, index) => (
                    <Fragment key={notify._id}>
                        <div className="flex-start cursor-pointer rounded-md px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600">
                            {notify.process === "deposit" ? (
                                <HandCoinsIcon className="size-10 !text-green-500" />
                            ) : (
                                <CreditCardIcon className="size-10 !text-rose-500" />
                            )}
                            <div className="">
                                <h3 className={textStyle(notify.process)}>{notify.reason}</h3>

                                <div className="flex-between">
                                    <p className={textStyle(notify.process)}>$ {notify.price}</p>
                                    <p className={textStyle(notify.process)}>{notify.method}</p>
                                    <p className={textStyle(notify.process)}>{notify.process}</p>
                                </div>

                                <div className={cn("flex-start text-slate-600 dark:text-slate-300", textStyle(notify.process))}>
                                    <Clock5Icon className={cn("size-4", textStyle(notify.process))} />
                                    {formatDistanceToNow(notify.createdAt || Date.now())}
                                </div>
                            </div>
                        </div>
                        {index !== data.length - 1 && <hr className="border-slate-600" />}
                    </Fragment>
                ))}
            </PopoverContent>
        </Popover>
    );
};

Notifications.displayName = "Notifications";
