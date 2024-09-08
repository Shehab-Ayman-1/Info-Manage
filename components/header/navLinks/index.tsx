"use client";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { clientLists, financeLists, productLists, statisticsLinks, supplierLists } from "@/constants";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { ListItems } from "./list-items";

export const navLinks = [
    { heading: "products", links: productLists },
    { heading: "clients", links: clientLists },
    { heading: "suppliers", links: supplierLists },
    { heading: "finances", links: financeLists },
    { heading: "statistics", links: statisticsLinks },
];

type NavLinksProps = {};

export const NavLinks = ({}: NavLinksProps) => {
    const [open, setOpen] = useState({ state: false, index: 0 });
    const text = useTranslations("header.navbar");

    const onOpen = (index: number) => {
        setOpen((open) => ({ state: !open.state, index }));
    };

    return (
        <nav className="flex-between !hidden lg:!flex">
            {navLinks.map((nav, index) => (
                <HoverCard
                    key={nav.heading}
                    closeDelay={0}
                    openDelay={0}
                    open={open.state && open.index === index}
                    onOpenChange={() => onOpen(index)}
                >
                    <HoverCardTrigger className="flex cursor-pointer items-center gap-1 py-2 hover:text-slate-500">
                        {text(`${nav.heading}.heading`)}
                        <ChevronDownIcon className="mt-1 size-4 hover:text-slate-700" />
                    </HoverCardTrigger>

                    <HoverCardContent sideOffset={-1} className="bg-white shadow-xl dark:border-slate-600">
                        <ListItems links={nav.links} heading={nav.heading} index={index} onOpen={onOpen} />
                    </HoverCardContent>
                </HoverCard>
            ))}
        </nav>
    );
};

NavLinks.displayName = "NavLinks";
