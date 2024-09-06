"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { Actions } from "./table-actions";

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
    },
    {
        accessorKey: "barcode",
        header: HeaderComponent,
    },
    {
        accessorKey: "marketCount",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="marketCount" showUnit />,
    },
    {
        accessorKey: "storeCount",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="storeCount" showUnit />,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} noPrint />,
        cell: Actions,
    },
];
