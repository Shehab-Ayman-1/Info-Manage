import { productLists, clientLists, supplierLists, financeLists, statisticsLinks } from "@/constants";
import { Accordion } from "@/ui/accordion";
import { List } from "./list";

type SheetLinksProps = {};

export const SheetLinks = ({}: SheetLinksProps) => {
    return (
        <Accordion collapsible type="single" className="w-full">
            <List trigger="Products" links={productLists} />
            <List trigger="Clients" links={clientLists} />
            <List trigger="Suppliers" links={supplierLists} />
            <List trigger="Finances" links={financeLists} />
            <List trigger="Statistics" links={statisticsLinks} />
        </Accordion>
    );
};

SheetLinks.displayName = "SheetLinks";
