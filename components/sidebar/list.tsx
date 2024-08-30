import { useTranslations } from "next-intl";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";
import { NavLinkType } from "@/constants";
import { ListItem } from "./listItem";

type ListProps = {
    trigger: string;
    links: NavLinkType[];
};

export const List = ({ trigger, links }: ListProps) => {
    const text = useTranslations("header.navbar");
    const triggerStyle =
        "text-base font-extrabold text-primary my-3 px-2 py-4 hover:no-underline hover:bg-primary-50 dark:hover:bg-slate-800 sm:p-4 sm:text-xl";

    return (
        <AccordionItem value={trigger} className="border-b border-b-primary">
            <AccordionTrigger className={triggerStyle}>{text(`${trigger}.heading`)}</AccordionTrigger>
            <AccordionContent>
                {links.map(({ Icon, title, href, userRole, subscriptions, additionalSubscriptions }) => (
                    <ListItem
                        key={title}
                        Icon={Icon}
                        heading={trigger}
                        title={title}
                        href={href}
                        userRole={userRole}
                        subscriptions={subscriptions}
                        additionalSubscriptions={additionalSubscriptions}
                    />
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};

List.displayName = "List";
