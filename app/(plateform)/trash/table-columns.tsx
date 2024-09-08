"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { Actions } from "./table-actions";
import { TranslateCell } from "@/components/table/body/translate-cell";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "type",
        header: HeaderComponent,
        cell: ({ row }) => <TranslateCell row={row} name="type" />,
    },
    {
        accessorKey: "deletedName",
        header: HeaderComponent,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} noPrint />,
        cell: Actions,
    },
];
