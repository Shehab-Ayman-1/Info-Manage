"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: HeaderComponent,
    },
    {
        accessorKey: "actions",
        header: HeaderComponent,
        cell: Actions,
    },
];
