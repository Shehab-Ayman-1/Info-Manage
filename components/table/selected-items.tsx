"use client";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { useModel } from "@/hooks/useModel";
import { Button } from "@/ui/button";

type SelectedItemsType = {
    items: Row<any>[];
    selectedSubmitButtons?: string[];
};

export const SelectedItems = ({ items, selectedSubmitButtons }: SelectedItemsType) => {
    const { onOpen } = useModel();
    const txt = useTranslations();

    if (!items.length || !selectedSubmitButtons) return;

    return (
        <div className="flex-between">
            {selectedSubmitButtons.map((text) => (
                <Button
                    key={text}
                    type="button"
                    className="flex-center mt-4 w-full text-base font-bold"
                    onClick={() => onOpen(`selected-${text}-model`, { items: items.map((item) => item.original) })}
                >
                    {txt(`buttons.${text}`)}
                </Button>
            ))}
        </div>
    );
};

SelectedItems.displayName = "SelectedItems";
