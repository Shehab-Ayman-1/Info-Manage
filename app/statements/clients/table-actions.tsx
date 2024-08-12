"use client";
import { EditIcon, Trash2Icon } from "lucide-react";
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
            Icon: Trash2Icon,
            text: "Delete",
            className: { button: "cancel", icon: "cancel" },
            onClick: (original: any) => onOpen("delete-model", { productId: original.productId }),
        },
    ];

    return <TableActions row={row} items={items} />;
};

Actions.displayName = "Actions";
