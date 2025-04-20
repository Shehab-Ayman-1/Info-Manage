"use client";
import { Row } from "@tanstack/react-table";
import { EditIcon } from "lucide-react";

import { TableActions } from "@/components/table/table-actions";
import { useRouter } from "next/navigation";

type ActionsProps = {
    row: Row<any>;
};

export const Actions = ({ row }: ActionsProps) => {
    const router = useRouter();

    const items = [
        {
            Icon: EditIcon,
            text: "open",
            onClick: (original: any) => router.push(`/profile/client/${original._id}`),
        },
    ];

    return <TableActions row={row} items={items} />;
};

Actions.displayName = "Actions";
