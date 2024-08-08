"use client";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderComponent } from "@/components/table/column-header";

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
        accessorKey: "total_sold",
        header: HeaderComponent,
    },
];
