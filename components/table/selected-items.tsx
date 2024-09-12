"use client";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type SelectedItemsType = {
    items: Row<any>[];
};

export const SelectedItems = ({ items }: SelectedItemsType) => {
    const { onOpen } = useModel();
    const text = useTranslations();
    if (!items.length) return;

    return (
        <Button
            type="button"
            className="flex-center mt-4 w-full text-base font-bold"
            onClick={() => onOpen(items[0]?.original?.modelType, { items: items.map((item) => item.original) })}
        >
            {text("buttons.buy")}
        </Button>
    );
};

SelectedItems.displayName = "SelectedItems";
