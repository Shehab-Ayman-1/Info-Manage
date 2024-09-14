"use client";
import { BadgeDollarSignIcon, EditIcon, Trash2Icon } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { TableActions } from "@/components/table/table-actions";
import { useModel } from "@/hooks/useModel";

type ActionsProps = {
    row: Row<any>;
};

export const Actions = ({ row }: ActionsProps) => {
    const { onOpen } = useModel();

    const items = [
        {
            Icon: EditIcon,
            text: "edit",
            onClick: (original: any) => onOpen("client-lists-update-model", { client: original }),
        },
        {
            Icon: BadgeDollarSignIcon,
            text: "pay",
            onClick: (original: any) => onOpen("client-lists-payment-model", { clientId: original._id }),
        },
        {
            Icon: Trash2Icon,
            text: "delete",
            className: { button: "cancel", icon: "cancel" },
            onClick: (original: any) => onOpen("client-lists-delete-model", { clientId: original._id }),
        },
    ];

    return <TableActions row={row} items={items} />;
};

Actions.displayName = "Actions";
