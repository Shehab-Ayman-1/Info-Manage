import { Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

import { cn } from "@/utils/shadcn";

type DateCellProps = {
    row: Row<any>;
    time?: boolean;
    noPrint?: boolean;
};

export const DateCell = ({ row, time, noPrint }: DateCellProps) => {
    const date = row.original?.createdAt || row.original?.lastSold;
    if (!date) return;

    const formatted = time ? formatDate(date, "hh:mm:ss a") : formatDate(date, "dd / MM / yyyy");
    return <span className={cn(noPrint && "print:hidden")}>{formatted}</span>;
};

DateCell.displayName = "DateCell";
