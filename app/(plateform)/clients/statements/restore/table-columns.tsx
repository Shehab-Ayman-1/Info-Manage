"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
    },
    {
        accessorKey: "count",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <NumberCell row={row} name="count" />,
    },
    {
        accessorKey: "soldPrice",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DollarCell row={row} name="soldPrice" />,
    },
    {
        accessorKey: "total",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DollarCell row={row} name="total" />,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} smallSize noPrint />,
        cell: Actions,
    },
];
