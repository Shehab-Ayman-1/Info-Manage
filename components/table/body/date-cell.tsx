import { cn } from "@/utils/shadcn";
import { Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

type DateCellProps = {
    row: Row<any>;
    noPrint?: boolean;
};

export const DateCell = ({ row, noPrint }: DateCellProps) => {
    const date = row.original?.createdAt || row.original?.created_At || row.original?.last_sold;
    if (!date) return;

    const formatted = formatDate(date, "dd / MM / yyyy");
    return <span className={cn(noPrint && "print:hidden")}>{formatted}</span>;
};

DateCell.displayName = "DateCell";
