import { NavLinkType } from "@/constants";
import { ListItem } from "./list-item";

type ListItemsType = {
    links: NavLinkType[];
    heading: string;
    index: number;
    onOpen: (index: number) => void;
};

export const ListItems = ({ links, heading, index, onOpen }: ListItemsType) => {
    const seperateBefore = [
        "today-purchases",
        "add-category",
        "new-statement",
        "add-client",
        "add-supplier",
        "least-selling",
        "best-selling-of-the-month",
        "recycle-bin",
    ];

    return links.map((link) => (
        <div key={link.title} onClick={() => onOpen(index)}>
            {seperateBefore.includes(link.title) && <hr className="border-slate-500" />}
            <ListItem heading={heading} {...link} />
        </div>
    ));
};

ListItems.displayName = "ListItems";
