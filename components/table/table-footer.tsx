import { TableCell, TableRow } from "@/ui/table";
import { cn } from "@/utils/shadcn";

type TableFooterProps = {
    colsLen: number;
    smallSize?: boolean;
    totalFor: string;
    total: number;
};

export const TableFooter = ({ colsLen, smallSize, totalFor, total }: TableFooterProps) => {
    return (
        <TableRow className="bg-gradient-heavy">
            <TableCell
                colSpan={colsLen}
                className={cn(
                    "font-bold text-black print:border-t print:border-t-slate-300",
                    smallSize ? "py-2 text-base" : "text-xl",
                )}
            >
                <div className="flex-around">
                    <p className="">Total {totalFor === "total" ? "Costs" : totalFor}</p>
                    <p className="">${total.toLocaleString()}</p>
                </div>
            </TableCell>
        </TableRow>
    );
};

TableFooter.displayName = "TableFooter";
