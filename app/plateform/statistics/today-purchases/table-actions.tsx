"use client";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { EyeIcon } from "lucide-react";

import { TableActions } from "@/components/table/table-actions";

type ActionsProps = {
    row: Row<any>;
};

export const Actions = ({ row }: ActionsProps) => {
    const router = useRouter();

    const items = [
        {
            Icon: EyeIcon,
            text: "Open",
            onClick: (original: any) => router.push(`/plateform/show/supplier-debts/${original._id}`),
        },
    ];

    return <TableActions row={row} items={items} />;
};

Actions.displayName = "Actions";
