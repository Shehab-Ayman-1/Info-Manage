import { formatDate, formatDistanceToNow } from "date-fns";
import { Row } from "@tanstack/react-table";
import { ar, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";

import { cn } from "@/utils/shadcn";

type DateCellProps = {
    row: Row<any>;
    name: string;
    time?: boolean;
    ago?: boolean;
    noPrint?: boolean;
};

export const DateCell = ({ row, name, time, ago, noPrint }: DateCellProps) => {
    const locale = useLocale();
    const date = row.original[name];
    if (!date) return;

    const timeDuration = formatDate(date, "hh:mm:ss a");
    const dateDuration = formatDate(date, "dd / MM / yyyy");
    const agoDuration = formatDistanceToNow(date, { locale: locale === "ar" ? ar : enUS });

    const formatted = time ? timeDuration : ago ? agoDuration : dateDuration;
    return <span className={cn(noPrint && "print:hidden")}>{formatted}</span>;
};

DateCell.displayName = "DateCell";
