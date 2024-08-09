"use client";
import { useAuth } from "@clerk/nextjs";
import { LockIcon } from "lucide-react";
import Link from "next/link";

import { useSidebarModel } from "@/hooks/useSidebarModel";
import { AccordionItem } from "@/ui/accordion";
import { NavLinkType } from "@/constants";
import { cn } from "@/utils/shadcn";

export const ListItem = ({ Icon, title, href, role }: NavLinkType) => {
    const { orgRole } = useAuth();
    const { onOpen } = useSidebarModel();

    const isAccessible = orgRole === "org:admin" || orgRole === role;
    const itemStyle =
        "flex-between cursor-pointer border-none p-4 hover:bg-primary-50 dark:hover:bg-slate-800 focus-visible:border-none";
    const titleStyle = cn(
        "text-sm sm:text-base font-bold",
        !isAccessible ? "!text-rose-500" : "!text-slate-600 dark:!text-slate-400",
    );

    return (
        <AccordionItem asChild value={title} key={title} className={itemStyle} onClick={() => onOpen(false)}>
            <Link href={!isAccessible ? "/" : href} className={cn(!isAccessible && "pointer-events-auto")}>
                <div className="flex-start">
                    <Icon
                        className={cn(
                            "size-4 sm:size-5",
                            !isAccessible ? "!text-rose-500" : "!text-slate-600 dark:!text-slate-400",
                        )}
                    />
                    <h3 className={titleStyle}>{title}</h3>
                </div>
                <LockIcon className={cn(isAccessible ? "hidden" : "size-4 !text-rose-500 sm:size-5")} />
            </Link>
        </AccordionItem>
    );
};

ListItem.displayName = "ListItem";
