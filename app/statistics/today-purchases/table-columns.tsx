"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { DollarCell } from "@/components/table/body/price-cell";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "supplier",
        header: HeaderComponent,
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
        accessorKey: "total",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="total" />,
    },
    {
        accessorKey: "actions",
        header: HeaderComponent,
        cell: Actions,
    },
];
