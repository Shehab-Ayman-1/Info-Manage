"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import Link from "next/link";
import { Button } from "@/ui/button";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "category",
        header: HeaderComponent,
    },
    {
        accessorKey: "company",
        header: HeaderComponent,
    },
    {
        accessorKey: "product",
        header: HeaderComponent,
        cell: ({ row }) => {
            return (
                <Button asChild type="button" variant="ghost" className="hover:bg-slate-300 hover:text-black">
                    <Link href={`/profile/product/${row.original._id}`}>{row.original.product}</Link>
                </Button>
            );
        },
    },
    {
        accessorKey: "barcode",
        header: HeaderComponent,
    },
    {
        accessorKey: "count",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="count" showUnit />,
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
