"use client";
import { ColumnDef } from "@tanstack/react-table";
import { HeaderComponent } from "@/components/table/column-header";
import { DollarCell } from "@/components/table/body/price-cell";

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
        accessorKey: "sold_count",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="sold_count" />,
    },
];
