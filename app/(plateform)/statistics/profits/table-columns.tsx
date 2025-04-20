"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { BadgeCell } from "@/components/table/body/level-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import { DateCell } from "@/components/table/body/date-cell";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "client",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
    },
    {
        accessorKey: "state",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <BadgeCell row={row} name="state" />,
    },
    {
        accessorKey: "profits",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DollarCell row={row} name="profits" />,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DateCell row={row} name="createdAt" time />,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: Actions,
    },
];
