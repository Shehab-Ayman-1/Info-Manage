"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { DollarCell } from "@/components/table/body/price-cell";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "supplier",
        header: HeaderComponent,
    },
    {
        accessorKey: "phone",
        header: HeaderComponent,
    },
    {
        accessorKey: "pending",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="pending" />,
    },
    {
        accessorKey: "products",
        header: HeaderComponent,
        cell: ({ row }) => row.original.products.map((product: string) => <p key={product}>{product}</p>),
    },
    {
        accessorKey: "actions",
        header: HeaderComponent,
        cell: Actions,
    },
];
