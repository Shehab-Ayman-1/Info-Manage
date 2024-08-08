"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "product",
        header: HeaderComponent,
    },
    {
        accessorKey: "price",
        header: HeaderComponent,
    },
    {
        accessorKey: "current_count",
        header: HeaderComponent,
    },
    {
        accessorKey: "needed_count",
        header: HeaderComponent,
    },
    {
        accessorKey: "total_cost",
        header: HeaderComponent,
    },
];
