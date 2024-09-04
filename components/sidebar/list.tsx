import { useTranslations } from "next-intl";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";
import { NavLinkType } from "@/constants";
import { ListItem } from "./listItem";
import { Fragment } from "react";

type ListProps = {
    trigger: string;
    links: NavLinkType[];
};

export const List = ({ trigger, links }: ListProps) => {
    const text = useTranslations("header.navbar");
    const triggerStyle =
        "text-base font-extrabold text-primary my-3 px-2 py-4 hover:no-underline hover:bg-primary-50 dark:hover:bg-slate-800 sm:p-4 sm:text-xl";

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
        <AccordionItem value={trigger} className="border-b border-b-primary">
            <AccordionTrigger className={triggerStyle}>{text(`${trigger}.heading`)}</AccordionTrigger>
            <AccordionContent>
                {links.map(({ Icon, title, href, userRole, subscriptions, additionalSubscriptions }) => (
                    <Fragment key={title}>
                        {seperateBefore.includes(title) && <hr className="border-slate-500" />}
                        <ListItem
                            Icon={Icon}
                            heading={trigger}
                            title={title}
                            href={href}
                            userRole={userRole}
                            subscriptions={subscriptions}
                            additionalSubscriptions={additionalSubscriptions}
                        />
                    </Fragment>
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};

List.displayName = "List";
