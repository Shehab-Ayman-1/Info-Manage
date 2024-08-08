import { AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";
import { ListItem } from "./listItem";
import { NavLinkType } from "@/constants";

type ListProps = {
    trigger: string;
    links: NavLinkType[];
};

export const List = ({ trigger, links }: ListProps) => {
    const triggerStyle =
        "text-xl font-extrabold text-primary my-3 p-4 hover:no-underline hover:bg-primary-50 dark:hover:bg-slate-800";

    return (
        <AccordionItem value={trigger} className="border-b border-b-primary-200 dark:border-b-primary-900">
            <AccordionTrigger className={triggerStyle}>{trigger}</AccordionTrigger>
            <AccordionContent>
                {links.map(({ Icon, title, href, role }) => (
                    <ListItem key={title} Icon={Icon} title={title} href={href} role={role} />
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};

List.displayName = "List";
