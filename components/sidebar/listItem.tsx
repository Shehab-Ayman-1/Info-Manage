"use client";
import { useAuth } from "@clerk/nextjs";
import { LockIcon } from "lucide-react";
import Link from "next/link";

import { useSidebarModel } from "@/hooks/useSidebarModel";
import { useSubscription } from "@/hooks/useSubscription";
import { AccordionItem } from "@/ui/accordion";
import { NavLinkType } from "@/constants";
import { Badge } from "@/ui/badge";
import { cn } from "@/utils/shadcn";

export const ListItem = ({ Icon, title, href, userRole, subscriptions }: NavLinkType) => {
    const { isSubscribe } = useSubscription(subscriptions);
    const { onOpen } = useSidebarModel();
    const { orgRole } = useAuth();

    const isAdmin = orgRole === "org:admin" || orgRole === userRole;

    const itemStyle = cn(
        "flex-between cursor-pointer border-none p-4 focus-visible:border-none",
        isAdmin && isSubscribe && "hover:bg-primary-50 dark:hover:bg-slate-800",
    );

    const titleStyle = cn(
        "text-sm sm:text-base font-bold",
        isAdmin && isSubscribe ? "!text-slate-600 dark:!text-slate-300" : "!text-slate-400 dark:!text-slate-500",
    );

    return (
        <AccordionItem asChild value={title} key={title} className={itemStyle} onClick={() => onOpen(false)}>
            <Link href={isAdmin && isSubscribe ? href : "/"} className={cn(!isAdmin && !isSubscribe && "pointer-events-auto")}>
                <div className="flex-start">
                    <Icon
                        className={cn(
                            "size-4 sm:size-5",
                            isAdmin && isSubscribe
                                ? "!text-slate-600 dark:!text-slate-300"
                                : "!text-slate-400 dark:!text-slate-500",
                        )}
                    />
                    <h3 className={titleStyle}>{title}</h3>
                </div>

                <div className="flex-end">
                    <LockIcon className={cn(isAdmin ? "hidden" : "size-4 !text-rose-500 sm:size-5")} />
                    {!isSubscribe && <Badge className="bg-rose-500 text-white hover:bg-rose-600">Pro</Badge>}
                </div>
            </Link>
        </AccordionItem>
    );
};

ListItem.displayName = "ListItem";
