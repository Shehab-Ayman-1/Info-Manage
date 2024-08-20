"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "companyName",
        header: HeaderComponent,
    },
    {
        accessorKey: "name",
        header: HeaderComponent,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} noPrint />,
        cell: Actions,
    },
];
