"use client";
import { Dispatch, SetStateAction } from "react";

import { Products } from "@/hooks/data/types";
import { ListItem } from "./listItem";

type ListItemsType = {
    data: Products["data"];
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ListItems = ({ data, setOpen }: ListItemsType) => {
    return (
        <div className="">
            {data.map((product) => (
                <ListItem key={product._id} setOpen={setOpen} product={product} />
            ))}
        </div>
    );
};

ListItems.displayName = "ListItems";
