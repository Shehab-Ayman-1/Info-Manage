import { RowModel } from "@tanstack/react-table";

import { TableBody, TableCell, TableRow } from "@/ui/table";
import { RenderRow } from "./body/render-row";
import { NoResults } from "./body/no-results";
import { cn } from "@/utils/shadcn";

type TBodyProps<TData> = {
    rowModel: RowModel<TData>;
    smallSize?: boolean;
    totalFor?: string;
    colsLen: number;
};

export const TBody = <TData,>({ rowModel, smallSize, colsLen, totalFor }: TBodyProps<TData>) => {
    const total = totalFor ? rowModel.rows.reduce((prev, cur: any) => prev + cur?.original?.[totalFor], 0) : 0;

    const colSpan1 = colsLen % 2 ? (colsLen - 1) / 2 : colsLen / 2;
    const colSpan2 = colsLen - colSpan1;

    return (
        <TableBody>
            {!rowModel.rows?.length && <NoResults colSpan={colsLen} />}

            {!!rowModel.rows?.length &&
                rowModel.rows.map((row, index) => <RenderRow key={row.id} row={row} index={index} smallSize={smallSize} />)}

            {!!totalFor && !!total && (
                <TableRow className="bg-gradient-heavy">
                    <TableCell
                        colSpan={colSpan1}
                        className={cn(
                            "text-center text-xl font-bold text-black print:border-t print:border-t-slate-300",
                            smallSize ? "py-2 text-base" : "text-xl",
                        )}
                    >
                        Total {totalFor === "total" ? "Costs" : totalFor}
                    </TableCell>
                    <TableCell
                        colSpan={colSpan2}
                        className={cn(
                            "text-center font-bold text-black print:border-t print:border-t-slate-300",
                            smallSize ? "py-2 text-base" : "text-xl",
                        )}
                    >
                        ${total.toLocaleString()}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};

TBody.Actions = TBody.displayName = "TBody";
