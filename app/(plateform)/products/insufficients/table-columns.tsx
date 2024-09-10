"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import { CheckboxCell } from "@/components/table/body/checkbox";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "company",
        header: HeaderComponent,
    },
    {
        accessorKey: "product",
        header: HeaderComponent,
    },
    {
        accessorKey: "barcode",
        header: HeaderComponent,
    },
    {
        accessorKey: "price",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="price" />,
    },
    {
        accessorKey: "currentCount",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="currentCount" showUnit />,
    },
    {
        accessorKey: "minimum",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="minimum" />,
    },
    {
        accessorKey: "totalNeeded",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="totalNeeded" />,
    },
    {
        accessorKey: "check",
        header: HeaderComponent,
        cell: ({ row }) => <CheckboxCell row={row} />,
    },
];
