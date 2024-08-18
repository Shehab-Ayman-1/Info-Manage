"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";

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
        accessorKey: "totalCount",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="totalCount" />,
    },
];
