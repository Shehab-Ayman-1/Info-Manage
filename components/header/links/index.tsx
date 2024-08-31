"use client";
import { useTranslations } from "next-intl";
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
    const text = useTranslations("header.navbar");

    const onClick = (index: number) => {
        setOpen((open) => ({ state: !open.state, index }));
    };

    const seperateBefore = [
        "today-purchases",
        "add-category",
        "new-statement",
        "add-client",
        "add-supplier",
        "least-selling",
        "best-selling-of-the-month",
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
                        {text(`${nav.heading}.heading`)}
                        <ChevronDownIcon className="mt-1 size-4 hover:text-slate-700" />
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
