"use client";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { EyeIcon } from "lucide-react";

import { TableActions } from "@/components/table/table-actions";
import { useOrg } from "@/hooks/useOrg";

type ActionsProps = {
    row: Row<any>;
};

export const Actions = ({ row }: ActionsProps) => {
    const router = useRouter();
    const { isAdmin } = useOrg();

    const items = [
        {
            Icon: EyeIcon,
            text: "open",
            onClick: (original: any) => router.push(`/profile/client/${original._id}`),
        },
    ];

    const availableItems = isAdmin ? items : items.filter((item) => item.text !== "Delete");
    return <TableActions row={row} items={availableItems} />;
};

Actions.displayName = "Actions";
