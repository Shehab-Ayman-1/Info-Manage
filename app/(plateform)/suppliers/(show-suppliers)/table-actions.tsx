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
            text: "edit-supplier",
            onClick: (original: any) => onOpen("suppliers-update-info-model", { supplier: original }),
        },
        {
            Icon: EditIcon,
            text: "edit-products",
            onClick: (original: any) =>
                onOpen("suppliers-update-supplier-products-model", { supplierId: original._id, products: original.products }),
        },
        {
            Icon: BadgeDollarSignIcon,
            text: "pay",
            onClick: (original: any) => onOpen("suppliers-payment-model", { supplierId: original._id }),
        },
        {
            Icon: Trash2Icon,
            text: "delete",
            className: { button: "cancel", icon: "cancel" },
            onClick: (original: any) => onOpen("suppliers-delete-model", { supplierId: original._id }),
        },
    ];

    return <TableActions row={row} items={items} />;
};

Actions.displayName = "Actions";
