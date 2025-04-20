"use client";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { Products } from "@/hooks/data/types";
import { Button } from "@/ui/button";

type ListItemType = {
    product: Products["data"][0];
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ListItem = ({ product, setOpen }: ListItemType) => {
    const router = useRouter();

    const onClick = (productId: string) => {
        router.push(`/profile/product/${productId}`);
        router.refresh();
        setOpen(!open);
    };

    return (
        <Button
            key={product._id}
            type="button"
            size="lg"
            variant="ghost"
            className="flex-between w-full"
            onClick={() => onClick(product._id)}
        >
            <p className="text-xl">{product.name}</p>
            <p className="text-xl">{product.company.name}</p>
        </Button>
    );
};

ListItem.displayName = "ListItem";
