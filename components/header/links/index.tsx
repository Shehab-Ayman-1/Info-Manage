import { clientLists, financeLists, productLists, statisticsLinks, supplierLists } from "@/constants";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

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
                    <HoverCardTrigger className="flex cursor-pointer items-center gap-1">
                        {nav.heading}
                        <ChevronDownIcon className="size-4 hover:text-slate-700" />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-gradient min-w-fit">
                        {nav.links.map(({ Icon, ...link }) => (
                            <Link
                                href={link.href}
                                key={link.title}
                                className="flex-start w-full cursor-pointer whitespace-nowrap rounded-md p-2 text-start text-lg hover:bg-primary-100 hover:text-black"
                            >
                                <Icon />
                                {link.title}
                            </Link>
                        ))}
                    </HoverCardContent>
                </HoverCard>
            ))}
        </nav>
    );
};

NavLinks.displayName = "NavLinks";
