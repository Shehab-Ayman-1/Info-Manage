import { Row } from "@tanstack/react-table";
import { formatDate, formatDistance } from "date-fns";

import { cn } from "@/utils/shadcn";

type DateCellProps = {
    row: Row<any>;
    time?: boolean;
    noPrint?: boolean;
};

export const DateCell = ({ row, time, noPrint }: DateCellProps) => {
    const date = row.original?.createdAt || row.original?.created_At || row.original?.last_sold;
    if (!date) return;

    const formatted = time ? formatDistance(date, new Date()) : formatDate(date, "dd / MM / yyyy");
    return <span className={cn(noPrint && "print:hidden")}>{formatted}</span>;
};

DateCell.displayName = "DateCell";
