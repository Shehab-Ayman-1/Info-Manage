"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "companyName",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
    },
    {
        accessorKey: "productName",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} smallSize noPrint />,
        cell: Actions,
    },
];
