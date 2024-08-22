import { showLinks, statementLinks, createLinks, statisticsLinks, receiptLinks } from "@/constants";
import { Accordion } from "@/ui/accordion";
import { List } from "./list";

type SheetLinksProps = {};

export const SheetLinks = ({}: SheetLinksProps) => {
    return (
        <Accordion collapsible type="single" className="w-full">
            <List trigger="Show" links={showLinks} />
            <List trigger="Statements" links={statementLinks} />
            <List trigger="Creates" links={createLinks} />
            <List trigger="Receipts" links={receiptLinks} />
            <List trigger="Statistics" links={statisticsLinks} />
        </Accordion>
    );
};

SheetLinks.displayName = "SheetLinks";
