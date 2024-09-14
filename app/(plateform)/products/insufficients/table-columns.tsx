"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { CheckCell } from "@/components/table/body/check-cell";
import { DollarCell } from "@/components/table/body/price-cell";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "check",
        header: ({ column }) => <HeaderComponent column={column} smallSize noPrint />,
        cell: ({ row }) => <CheckCell row={row} />,
    },
    {
        accessorKey: "company",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
    },
    {
        accessorKey: "product",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
    },
    {
        accessorKey: "minimum",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <NumberCell row={row} name="minimum" showUnit />,
    },
    {
        accessorKey: "marketCount",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <NumberCell row={row} name="marketCount" showUnit />,
    },
    {
        accessorKey: "storeCount",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <NumberCell row={row} name="storeCount" showUnit />,
    },
    {
        accessorKey: "soldPrice",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DollarCell row={row} name="soldPrice" />,
    },
    {
        accessorKey: "purchasePrice",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DollarCell row={row} name="purchasePrice" />,
    },
];
