"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { DateCell } from "@/components/table/body/date-cell";
import { BadgeCell } from "@/components/table/body/level-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "client",
        header: HeaderComponent,
    },
    {
        accessorKey: "state",
        header: HeaderComponent,
        cell: ({ row }) => <BadgeCell row={row} name="state" />,
    },
    {
        accessorKey: "paid",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="paid" />,
    },
    {
        accessorKey: "pending",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="pending" />,
    },
    {
        accessorKey: "discount",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="discount" />,
    },
    {
        accessorKey: "total",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="total" />,
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
