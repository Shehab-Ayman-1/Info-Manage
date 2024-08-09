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

    return (
        <TableBody>
            {!rowModel.rows?.length && <NoResults colSpan={colsLen} />}

            {!!rowModel.rows?.length &&
                rowModel.rows.map((row, index) => <RenderRow key={row.id} row={row} index={index} smallSize={smallSize} />)}

            {!!totalFor && !!total && (
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
            )}
        </TableBody>
    );
};

TBody.Actions = TBody.displayName = "TBody";
