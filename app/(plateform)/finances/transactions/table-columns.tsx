"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { TranslateCell } from "@/components/table/body/translate-cell";
import { BadgeCell } from "@/components/table/body/level-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import { DateCell } from "@/components/table/body/date-cell";

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
        accessorKey: "process",
        header: HeaderComponent,
        cell: ({ row }) => <BadgeCell row={row} name="process" />,
    },
    {
        accessorKey: "price",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="price" />,
    },
    {
        accessorKey: "method",
        header: HeaderComponent,
        cell: ({ row }) => <BadgeCell row={row} name="method" />,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <HeaderComponent column={column} noPrint />,
        cell: ({ row }) => <DateCell row={row} name="createdAt" time noPrint />,
    },
];
