import { Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

type DateCellProps = {
    row: Row<any>;
};

export const DateCell = ({ row }: DateCellProps) => {
    const date = row.original?.created_At || row.original?.last_sold;
    if (!date) return;

    const formatted = formatDate(date, "dd / MM / yyyy");
    return formatted;
};

DateCell.displayName = "DateCell";
