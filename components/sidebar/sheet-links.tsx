import { productLists, clientLists, supplierLists, financeLists, statisticsLinks } from "@/constants";
import { Accordion } from "@/ui/accordion";
import { List } from "./list";

type SheetLinksProps = {};

export const SheetLinks = ({}: SheetLinksProps) => {
    return (
        <Accordion collapsible type="single" className="w-full">
            <List trigger="products" links={productLists} />
            <List trigger="clients" links={clientLists} />
            <List trigger="suppliers" links={supplierLists} />
            <List trigger="finances" links={financeLists} />
            <List trigger="statistics" links={statisticsLinks} />
        </Accordion>
    );
};

SheetLinks.displayName = "SheetLinks";
