import { showLinks, statementLinks, createLinks, statisticsLinks } from "@/constants";
import { Accordion } from "@/ui/accordion";
import { List } from "./list";

type SheetLinksProps = {};

export const SheetLinks = ({}: SheetLinksProps) => {
    return (
        <Accordion collapsible type="single" className="w-full">
            <List trigger="Show" links={showLinks} />
            <List trigger="Statement" links={statementLinks} />
            <List trigger="Create" links={createLinks} />
            <List trigger="Statistics" links={statisticsLinks} />
        </Accordion>
    );
};

SheetLinks.displayName = "SheetLinks";
