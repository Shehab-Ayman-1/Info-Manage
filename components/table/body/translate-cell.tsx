"use client";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { reasons } from "@/constants/finances";

type TranslateCellType = {
    row: Row<any>;
    name: string;
    isReason?: boolean;
};

export const TranslateCell = ({ row, name, isReason }: TranslateCellType) => {
    const text = useTranslations();
    const value = row.original[name].toLowerCase();

    const reasonText = reasons.includes(value) ? text(`public.${value.replaceAll(" ", "-")}`) : value;
    return isReason ? reasonText : text(`table.${value}`);
};

TranslateCell.displayName = "TranslateCell";
