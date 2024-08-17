"use client";
import { ColumnDef } from "@tanstack/react-table";

import { HeaderComponent } from "@/components/table/column-header";
import { Actions } from "./table-actions";
import { DateCell } from "@/components/table/body/date-cell";
import { BadgeCell } from "@/components/table/body/level-cell";
import { UserCell } from "@/components/table/body/user-cell";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "user",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <UserCell row={row} />,
    },
    {
        accessorKey: "role",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <BadgeCell row={row} name="role" />,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <HeaderComponent column={column} smallSize />,
        cell: ({ row }) => <DateCell row={row} />,
    },
    {
        accessorKey: "actions",
        header: ({ column }) => <HeaderComponent column={column} smallSize noPrint />,
        cell: Actions,
    },
];
