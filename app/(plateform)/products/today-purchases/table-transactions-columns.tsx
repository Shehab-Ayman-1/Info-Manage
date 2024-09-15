"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { TranslateCell } from "@/components/table/body/translate-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import { BadgeCell } from "@/components/table/body/level-cell";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "creator",
        header: HeaderComponent,
    },
    {
        accessorKey: "reason",
        header: HeaderComponent,
        cell: ({ row }) => <TranslateCell row={row} name="reason" isReason />,
    },
    {
        accessorKey: "method",
        header: HeaderComponent,
        cell: ({ row }) => <BadgeCell row={row} name="method" />,
    },
    {
        accessorKey: "costs",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="costs" />,
    },
];
