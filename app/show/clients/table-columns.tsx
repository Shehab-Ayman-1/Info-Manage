"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { BadgeCell } from "@/components/table/body/level-cell";
import { DollarCell } from "@/components/table/body/price-cell";
import { Actions } from "./table-actions";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "client",
        header: HeaderComponent,
    },
    {
        accessorKey: "discounts",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="discounts" />,
    },
    {
        accessorKey: "boughts",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="boughts" />,
    },
    {
        accessorKey: "pending",
        header: HeaderComponent,
        cell: ({ row }) => <DollarCell row={row} name="pending" />,
    },
    {
        accessorKey: "level",
        header: HeaderComponent,
        cell: ({ row }) => <BadgeCell row={row} name="level" />,
    },
    {
        accessorKey: "actions",
        header: HeaderComponent,
        cell: Actions,
    },
];
