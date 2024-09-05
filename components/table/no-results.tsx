"use client";
import { TableCell, TableRow } from "@/ui/table";
import { useTranslations } from "next-intl";

export const NoResults = ({ colSpan }: { colSpan: number }) => {
    const text = useTranslations("table");

    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="h-24 text-center">
                {text("no-results")}
            </TableCell>
        </TableRow>
    );
};

NoResults.displayName = "NoResults";
