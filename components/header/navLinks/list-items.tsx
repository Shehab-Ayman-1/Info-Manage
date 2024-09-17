import { motion } from "framer-motion";

import { animate, NavLinkType } from "@/constants";
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

    return links.map((link, index) => (
        <motion.div key={link.title} {...animate("translate")} transition={{ duration: index / 7 }} onClick={() => onOpen(index)}>
            {seperateBefore.includes(link.title) && <hr className="border-slate-500" />}
            <ListItem heading={heading} {...link} />
        </motion.div>
    ));
};

ListItems.displayName = "ListItems";
