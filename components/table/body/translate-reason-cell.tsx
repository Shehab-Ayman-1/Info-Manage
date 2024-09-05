"use client";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

type TranslateReasonCellType = {
    row: Row<any>;
    name: string;
};

export const TranslateReasonCell = ({ row, name }: TranslateReasonCellType) => {
    const text = useTranslations("public");
    const value = row.original[name].toLowerCase().replaceAll(" ", "-");

    const reasons = [
        "client-statement",
        "supplier-statement",
        "restored-client-statement",
        "restored-supplier-statement",
        "client-bill-payment",
        "supplier-bill-payment",
        "canceled-supplier-bill",
    ];

    return reasons.includes(value) ? text(value) : value;
};

TranslateReasonCell.displayName = "TranslateReasonCell";
