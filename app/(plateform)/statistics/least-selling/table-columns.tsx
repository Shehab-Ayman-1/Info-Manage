"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { DateCell } from "@/components/table/body/date-cell";

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
        accessorKey: "lastSold",
        header: HeaderComponent,
        cell: ({ row }) => <DateCell name="lastSold" row={row} />,
    },
];
