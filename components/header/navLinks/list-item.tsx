"use client";
import { useTranslations } from "next-intl";
import { useAuth } from "@clerk/nextjs";
import { LockIcon } from "lucide-react";
import Link from "next/link";

import { useSubscription } from "@/hooks/useSubscription";
import { NavLinkType } from "@/constants";
import { Badge } from "@/ui/badge";
import { cn } from "@/utils/shadcn";

type ListItemProps = NavLinkType & {
    heading: string;
};

export const ListItem = ({ heading, title, href, Icon, userRole, subscriptions, additionalSubscriptions }: ListItemProps) => {
    const { isAdditionalSubscribe } = useSubscription(additionalSubscriptions, subscriptions);
    const { orgRole } = useAuth();
    
    const text = useTranslations("header.navbar");

    const isAdmin = orgRole === "org:admin" || orgRole === userRole;

    return (
        <Link
            href={isAdmin && isAdditionalSubscribe ? href : "/"}
            className={cn(
                "flex-between group whitespace-nowrap rounded-md p-4",
                isAdmin && isAdditionalSubscribe && "group hover:bg-primary-100",
                (!isAdmin || !isAdditionalSubscribe) && "pointer-events-none",
            )}
        >
            <div className="flex-start">
                <Icon
                    className={cn(
                        "size-4 sm:size-5",
                        isAdmin && isAdditionalSubscribe ? "group-hover:text-black" : "!text-slate-400 dark:!text-slate-500",
                    )}
                />
                <h3
                    className={cn(
                        "text-sm font-bold sm:text-base",
                        isAdmin && isAdditionalSubscribe ? "group-hover:text-black" : "!text-slate-400 dark:!text-slate-500",
                    )}
                >
                    {text(`${heading}.${title}`)}
                </h3>
            </div>

            <div className="flex-end">
                {!isAdditionalSubscribe &&
                    additionalSubscriptions.map((name) => (
                        <Badge key={name} className={cn("text-white", name === "premium" ? "bg-purple-800" : "bg-green-700")}>
                            {name}
                        </Badge>
                    ))}
                <LockIcon className={cn(isAdmin ? "hidden" : "size-4 !text-rose-500 sm:size-5")} />
            </div>
        </Link>
    );
};

ListItem.displayName = "ListItem";
