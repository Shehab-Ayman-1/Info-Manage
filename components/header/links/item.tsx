"use client";
import { useAuth } from "@clerk/nextjs";
import { LockIcon } from "lucide-react";
import Link from "next/link";

import { useSubscription } from "@/hooks/useSubscription";
import { NavLinkType } from "@/constants";
import { cn } from "@/utils/shadcn";
import { Badge } from "@/ui/badge";

export const Item = ({ title, href, Icon, userRole, subscriptions, additionalSubscriptions }: NavLinkType) => {
    const { isAdditionalSubscribe } = useSubscription(additionalSubscriptions, subscriptions);
    const { orgRole } = useAuth();

    const isAdmin = orgRole === "org:admin" || orgRole === userRole;

    return (
        <Link
            href={isAdmin && isAdditionalSubscribe ? href : "/"}
            className={cn(
                "flex-between group cursor-pointer whitespace-nowrap border-none p-4 focus-visible:border-none",
                isAdmin && isAdditionalSubscribe && "hover:bg-primary-50 dark:hover:bg-slate-800",
                (!isAdmin || !isAdditionalSubscribe) && "pointer-events-none",
            )}
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
                <h3
                    className={cn(
                        "text-sm font-bold sm:text-base",
                        isAdmin && isAdditionalSubscribe
                            ? "!text-slate-600 dark:!text-slate-300"
                            : "!text-slate-400 dark:!text-slate-500",
                    )}
                >
                    {title}
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

Item.displayName = "Item";
