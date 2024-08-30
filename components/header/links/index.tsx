"use client";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { clientLists, financeLists, productLists, statisticsLinks, supplierLists } from "@/constants";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Item } from "./item";

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

    const onClick = (index: number) => {
        setOpen((open) => ({ state: !open.state, index }));
    };

    const seperateBefore = [
        "Today Purchases Receipt",
        "Add New Category",
        "New Statement",
        "Add New Client",
        "Add New Supplier",
        "Least Selling",
        "Best Selling Of The (Month)",
    ];

    return (
        <nav className="flex-between !hidden xl:!flex">
            {navLinks.map((nav, index) => (
                <HoverCard
                    key={nav.heading}
                    closeDelay={0}
                    openDelay={0}
                    open={open.state && open.index === index}
                    onOpenChange={() => onClick(index)}
                >
                    <HoverCardTrigger className="flex cursor-pointer items-center gap-1 py-2 hover:text-slate-500">
                        {nav.heading}
                        <ChevronDownIcon className="size-4 hover:text-slate-700" />
                    </HoverCardTrigger>

                    <HoverCardContent sideOffset={-1} className="bg-gradient min-w-fit border-slate-300 dark:border-slate-600">
                        {nav.links.map((link) => (
                            <div key={link.title} onClick={() => onClick(index)}>
                                {seperateBefore.includes(link.title) && <hr className="border-slate-500" />}
                                <Item heading={nav.heading} {...link} />
                            </div>
                        ))}
                    </HoverCardContent>
                </HoverCard>
            ))}
        </nav>
    );
};

NavLinks.displayName = "NavLinks";
