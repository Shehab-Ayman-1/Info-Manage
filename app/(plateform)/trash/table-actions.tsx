"use client";
import { ArchiveRefund } from "lucide-react";
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
            Icon: ArchiveRefund,
            text: "refund",
            onClick: (original: any) => onOpen("refund-model", { _id: original._id, type: original.type }),
        },
    ];

    return <TableActions row={row} items={items} />;
};

Actions.displayName = "Actions";
