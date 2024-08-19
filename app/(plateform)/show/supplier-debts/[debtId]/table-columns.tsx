"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { DollarCell } from "@/components/table/body/price-cell";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "product",
        header: HeaderComponent,
    },
    {
        accessorKey: "count",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="count" />,
    },
    {
        accessorKey: "price",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="price" />,
    },
    {
        accessorKey: "total",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="total" />,
    },
];
