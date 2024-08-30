"use client";
import { BadgeDollarSignIcon, EyeIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { TableActions } from "@/components/table/table-actions";
import { useModel } from "@/hooks/useModel";
import { useOrg } from "@/hooks/useOrg";

type ActionsProps = {
    row: Row<any>;
};

export const Actions = ({ row }: ActionsProps) => {
    const router = useRouter();
    const { isAdmin } = useOrg();
    const { onOpen } = useModel();

    const items = [
        {
            Icon: EyeIcon,
            text: "Open",
            onClick: (original: any) => router.push(`/profile/client/${original._id}`),
        },
        {
            Icon: EyeIcon,
            text: "Edit",
            onClick: (original: any) => onOpen("edit-bill-model", { original }),
        },
        {
            Icon: BadgeDollarSignIcon,
            text: "Pay",
            onClick: (original: any) => onOpen("pay-model", { billId: original._id }),
        },
    ];

    const availableItems = isAdmin ? items : items.filter((item) => item.text !== "Delete");
    return <TableActions row={row} items={availableItems} />;
};

Actions.displayName = "Actions";
