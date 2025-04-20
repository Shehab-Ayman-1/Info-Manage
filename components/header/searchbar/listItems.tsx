"use client";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

import { Products } from "@/hooks/data/types";
import { animate } from "@/constants";
import { ListItem } from "./listItem";

type ListItemsType = {
    data: Products["data"];
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ListItems = ({ data, setOpen }: ListItemsType) => {
    return (
        <div className="">
            {data.map((product, index) => (
                <motion.span key={product._id} {...animate("opacity")} transition={{ duration: index / 20 }}>
                    <ListItem setOpen={setOpen} product={product} />
                </motion.span>
            ))}
        </div>
    );
};

ListItems.displayName = "ListItems";
