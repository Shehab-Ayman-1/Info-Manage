import { flexRender } from "@tanstack/react-table";

import { TableCell, TableRow } from "@/ui/table";
import { cn } from "@/utils/shadcn";

export type RenderCell = {
    text: string;
    cellStyle: string;
};

type RenderRowProps = {
    row: any;
    index: number;
    smallSize?: boolean;
};

export const RenderRow = ({ row, index, smallSize }: RenderRowProps) => {
    const visibleCells = row.getVisibleCells();
    const rowStyle = cn("border-none hover:bg-transparent", index % 2 === 0 && "bg-gradient-light");

    return (
        <TableRow className={rowStyle}>
            {visibleCells.map((cell: any) => {
                const TDCell = flexRender(cell.column.columnDef.cell, cell.getContext());
                return (
                    <TableCell
                        key={cell.id}
                        className={cn(
                            "py-2 text-center print:text-base print:text-black",
                            smallSize ? "py-0 text-base" : "text-lg",
                        )}
                    >
                        {TDCell}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

RenderRow.displayName = "RenderRow";
