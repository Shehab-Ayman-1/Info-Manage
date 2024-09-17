"use client";
import { CircleFadingArrowUpIcon, Clock5Icon, CreditCardIcon, HandCoinsIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatDistanceToNow } from "date-fns";
import { enUS, ar } from "date-fns/locale";
import { motion } from "framer-motion";

import { cn } from "@/utils/shadcn";
import { Notify } from "./index";
import { animate } from "@/constants";

type NotifyItem = {
    notify: Notify;
    index: number;
};

export const NotifyItem = ({ notify, index }: NotifyItem) => {
    const text = useTranslations("public");
    const locale = useLocale();

    const isSubscription = notify.method === "vodafone-cash";
    const subscriptionColor = isSubscription && "text-amber-800 dark:text-amber-300";

    return (
        <motion.div
            {...animate("opacity")}
            transition={{ duration: index / 10 }}
            className="flex-start cursor-pointer rounded-md px-4 py-2 hover:bg-primary-100 dark:hover:bg-slate-600"
        >
            {notify.method === "vodafone-cash" && <CircleFadingArrowUpIcon className={cn("size-8", subscriptionColor)} />}
            {notify.method === "cash" && <HandCoinsIcon className={cn("size-8", subscriptionColor)} />}
            {notify.method === "visa" && <CreditCardIcon className={cn("size-8", subscriptionColor)} />}

            <div className="w-full">
                <h3 className={cn("text-sm font-bold", subscriptionColor)}>
                    {!isSubscription ? text(notify.reason.toLowerCase().replaceAll(" ", "-")) : notify.method}
                </h3>

                <div className="flex items-center gap-2">
                    <p className={cn("text-sm font-bold", subscriptionColor)}>${notify.price}</p>
                    <p className={cn("text-sm font-bold", subscriptionColor)}>{text(notify.process)}</p>
                    <p className={cn("text-sm font-bold", subscriptionColor)}>{text(notify.method)}</p>
                </div>

                <div className={cn("flex-start", subscriptionColor)}>
                    <Clock5Icon className={cn("size-4", subscriptionColor)} />
                    <p>{formatDistanceToNow(notify.createdAt || Date.now(), { locale: locale === "ar" ? ar : enUS })}</p>
                </div>
            </div>
        </motion.div>
    );
};

NotifyItem.displayName = "NotifyItem";
