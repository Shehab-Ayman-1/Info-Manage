import { flexRender, Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { TableCell, TableRow } from "@/ui/table";
import { animate } from "@/constants";
import { cn } from "@/utils/shadcn";

export type RenderCell = {
    text: string;
    cellStyle: string;
};

type RenderRowProps = {
    row: Row<any>;
    smallSize?: boolean;
};

export const RenderRow = ({ row, smallSize }: RenderRowProps) => {
    const text = useTranslations();
    const visibleCells = row.getVisibleCells();
    const rowStyle = cn("border-none hover:bg-transparent", row.index % 2 === 0 && "bg-gradient-light");

    return (
        <TableRow className={rowStyle}>
            {visibleCells.map((cell: any) => {
                const TDCell = flexRender(cell.column.columnDef.cell, cell.getContext());

                const isPerson = cell.column.id === "client" || cell.column.id === "supplier";
                const isUnknown = cell.row.original.client === "unknown" || cell.row.original.supplier === "unknown";

                return (
                    <TableCell
                        key={cell.id}
                        className={cn(
                            "whitespace-nowrap px-1 text-center text-sm print:text-black",
                            smallSize ? "py-1" : "py-4 sm:text-base",
                        )}
                    >
                        <motion.span {...animate("opacity")} transition={{ duration: row.index / 10 }}>
                            {isPerson && isUnknown ? text("public.unknown") : TDCell}
                        </motion.span>
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

RenderRow.displayName = "RenderRow";
