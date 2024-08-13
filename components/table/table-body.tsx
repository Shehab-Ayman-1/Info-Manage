import { RowModel } from "@tanstack/react-table";

import { TableBody } from "@/ui/table";
import { RenderRow } from "./body/render-row";
import { TableFooter } from "./table-footer";
import { NoResults } from "./no-results";

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

            {!!totalFor && !!total && <TableFooter colsLen={colsLen} smallSize={smallSize} totalFor={totalFor} total={total} />}
        </TableBody>
    );
};

TBody.Actions = TBody.displayName = "TBody";
