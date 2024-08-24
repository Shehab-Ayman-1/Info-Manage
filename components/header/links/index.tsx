"use client";
import { ChevronDownIcon } from "lucide-react";

import { clientLists, financeLists, productLists, statisticsLinks, supplierLists } from "@/constants";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Item } from "./item";

export const navLinks = [
    { heading: "Products", links: productLists },
    { heading: "Clients", links: clientLists },
    { heading: "Suppliers", links: supplierLists },
    { heading: "Finances", links: financeLists },
    { heading: "Statistics", links: statisticsLinks },
];

type NavLinksProps = {};

export const NavLinks = ({}: NavLinksProps) => {
    return (
        <nav className="flex-between !hidden xl:!flex">
            {navLinks.map((nav) => (
                <HoverCard key={nav.heading} closeDelay={0} openDelay={0}>
                    <HoverCardTrigger className="flex cursor-pointer items-center gap-1 py-2">
                        {nav.heading}
                        <ChevronDownIcon className="size-4 hover:text-slate-700" />
                    </HoverCardTrigger>

                    <HoverCardContent sideOffset={-1} className="bg-gradient min-w-fit border-slate-300 dark:border-slate-600">
                        {nav.links.map((link) => (
                            <Item key={link.title} {...link} />
                        ))}
                    </HoverCardContent>
                </HoverCard>
            ))}
        </nav>
    );
};

NavLinks.displayName = "NavLinks";
