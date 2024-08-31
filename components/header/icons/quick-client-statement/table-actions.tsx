"use client";
import { Row } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

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
            text: "delete",
            className: { button: "cancel", icon: "cancel" },
            onClick: (original: any) =>
                onOpen("quick-client-statement-model", { productId: original.productId, isDeleteAble: true }),
        },
    ];

    return <TableActions row={row} items={items} />;
};

Actions.displayName = "Actions";
