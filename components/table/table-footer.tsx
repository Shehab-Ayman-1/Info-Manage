import { useTranslations } from "next-intl";

import { TableCell, TableRow } from "@/ui/table";
import { cn } from "@/utils/shadcn";

type TableFooterProps = {
    colsLen: number;
    smallSize?: boolean;
    totalFor: string;
    total: number;
};

export const TableFooter = ({ colsLen, smallSize, totalFor, total }: TableFooterProps) => {
    const text = useTranslations("table");

    const notTotal = totalFor.includes("total") ? text(totalFor.slice(5).toLowerCase()) : text(totalFor);
    const name = totalFor === "total" ? text("costs") : notTotal;

    return (
        <TableRow className="bg-gradient-heavy">
            <TableCell colSpan={colsLen} className={cn("font-bold text-white", smallSize ? "py-2 text-base" : "text-xl")}>
                <div className="flex-around">
                    <p className="">
                        {text("total")} {name}
                    </p>
                    <p className="">${total.toLocaleString()}</p>
                </div>
            </TableCell>
        </TableRow>
    );
};

TableFooter.displayName = "TableFooter";
