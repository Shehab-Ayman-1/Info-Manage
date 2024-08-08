"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { DateCell } from "@/components/table/body/date-cell";
import { BadgeCell } from "@/components/table/body/level-cell";
import { DollarCell } from "@/components/table/body/price-cell";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "creator",
        header: HeaderComponent,
    },
    {
        accessorKey: "reason",
        header: HeaderComponent,
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
        accessorKey: "created_At",
        header: HeaderComponent,
        cell: ({ row }) => <DateCell row={row} />,
    },
];
