"use client";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

type TranslateCellType = {
    row: Row<any>;
    name: string;
    isReason?: boolean;
};

export const TranslateCell = ({ row, name, isReason }: TranslateCellType) => {
    const text = useTranslations();
    const value = row.original[name].toLowerCase().replaceAll(" ", "-");

    const reasons = [
        "client-statement",
        "supplier-statement",
        "restored-client-statement",
        "restored-supplier-statement",
        "client-invoice-payment",
        "supplier-invoice-payment",
        "canceled-supplier-invoice",
    ];

    const reasonText = reasons.includes(value) ? text(`public.${value}`) : value;
    return isReason ? reasonText : text(`table.${value}`);
};

TranslateCell.displayName = "TranslateCell";
