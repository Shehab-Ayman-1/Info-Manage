"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { BadgeCell } from "@/components/table/body/level-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import { DateCell } from "@/components/table/body/date-cell";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "supplier",
        header: HeaderComponent,
    },
    {
        accessorKey: "state",
        header: HeaderComponent,
        cell: ({ row }) => <BadgeCell name="state" row={row} />,
    },
    {
        accessorKey: "paid",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell name="paid" row={row} />,
    },
    {
        accessorKey: "pending",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell name="pending" row={row} />,
    },
    {
        accessorKey: "total",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell name="total" row={row} />,
    },
    {
        accessorKey: "createdAt",
        header: HeaderComponent,
        cell: ({ row }) => <DateCell row={row} time />,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} noPrint />,
        cell: Actions,
    },
];
