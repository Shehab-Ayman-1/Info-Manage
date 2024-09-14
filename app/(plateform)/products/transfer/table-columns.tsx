"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { NumberCell } from "@/components/table/body/number-cell";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "company",
        header: HeaderComponent,
    },
    {
        accessorKey: "name",
        header: HeaderComponent,
    },
    {
        accessorKey: "count",
        header: HeaderComponent,
        cell: ({ row }) => <NumberCell row={row} name="count" />,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} smallSize noPrint />,
        cell: Actions,
    },
];
