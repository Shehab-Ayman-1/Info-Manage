"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { DollarCell } from "@/components/table/body/price-cell";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "company",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
    },
    {
        accessorKey: "product",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
    },
    {
        accessorKey: "checkedCount",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <NumberCell row={row} name="checkedCount" />,
    },
    {
        accessorKey: "purchasePrice",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DollarCell row={row} name="purchasePrice" />,
    },
    {
        accessorKey: "total",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DollarCell row={row} name="total" />,
    },
];
