"use client";
import { useTranslations } from "next-intl";
import { useAuth } from "@clerk/nextjs";
import { LockIcon } from "lucide-react";
import Link from "next/link";

import { useSidebarModel } from "@/hooks/useSidebarModel";
import { useSubscription } from "@/hooks/useSubscription";

import { AccordionItem } from "@/ui/accordion";
import { NavLinkType } from "@/constants";
import { Badge } from "@/ui/badge";
import { cn } from "@/utils/shadcn";

type ItemType = NavLinkType & {
    heading: string;
};

export const ListItem = ({ Icon, heading, title, href, userRole, subscriptions, additionalSubscriptions }: ItemType) => {
    const { isAdditionalSubscribe } = useSubscription(additionalSubscriptions, subscriptions);
    const text = useTranslations("header.navbar");
    const { onOpen } = useSidebarModel();
    const { orgRole } = useAuth();

    const isAdmin = orgRole === "org:admin" || orgRole === userRole;

    const itemStyle = cn(
        "flex-between cursor-pointer border-none p-4 focus-visible:border-none",
        isAdmin && isAdditionalSubscribe && "hover:bg-primary-50 dark:hover:bg-slate-800",
    );

    const titleStyle = cn(
        "text-sm sm:text-base font-bold",
        isAdmin && isAdditionalSubscribe ? "!text-slate-600 dark:!text-slate-300" : "!text-slate-400 dark:!text-slate-500",
    );

    return (
        <AccordionItem asChild value={title} key={title} className={itemStyle} onClick={() => onOpen(false)}>
            <Link
                href={isAdmin && isAdditionalSubscribe ? href : "/"}
                className={cn(!isAdmin && !isAdditionalSubscribe && "pointer-events-auto")}
            >
                <div className="flex-start">
                    <Icon
                        className={cn(
                            "size-4 sm:size-5",
                            isAdmin && isAdditionalSubscribe
                                ? "!text-slate-600 dark:!text-slate-300"
                                : "!text-slate-400 dark:!text-slate-500",
                        )}
                    />
                    <h3 className={titleStyle}>{text(`${heading}.${title}`)}</h3>
                </div>

                <div className="flex-end">
                    <LockIcon className={cn(isAdmin ? "hidden" : "size-4 !text-rose-500 sm:size-5")} />
                    {!isAdditionalSubscribe &&
                        additionalSubscriptions.map((name) => (
                            <Badge key={name} className={cn("text-white", name === "premium" ? "bg-purple-700" : "bg-green-700")}>
                                {name}
                            </Badge>
                        ))}
                </div>
            </Link>
        </AccordionItem>
    );
};

ListItem.displayName = "ListItem";
