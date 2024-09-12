"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { CheckCell } from "@/components/table/body/check-cell";
import { DollarCell } from "@/components/table/body/price-cell";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "check",
        header: HeaderComponent,
        cell: ({ row }) => <CheckCell row={row} type="insufficient-products" />,
    },
    {
        accessorKey: "company",
        header: HeaderComponent,
    },
    {
        accessorKey: "product",
        header: HeaderComponent,
    },
    {
        accessorKey: "minimum",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="minimum" showUnit />,
    },
    {
        accessorKey: "soldPrice",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="soldPrice" />,
    },
    {
        accessorKey: "purchasePrice",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="purchasePrice" />,
    },
    {
        accessorKey: "currentCount",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="currentCount" showUnit />,
    },
];
