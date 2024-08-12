"use client";
import { useState } from "react";

import { ColumnDef, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { SortingState, getSortedRowModel } from "@tanstack/react-table";
import { ColumnFiltersState } from "@tanstack/react-table";

import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Table } from "@/ui/table";
import { Controllers } from "./controllers";
import { THeader } from "./table-header";
import { TBody } from "./table-body";
import { Filter } from "./filter";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterFor?: string;
    totalFor?: string;
    smallSize?: boolean;
};

export const DataTable = <TData, TValue>({ columns, data, filterFor, totalFor, smallSize }: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,

        // Rows
        getCoreRowModel: getCoreRowModel(),

        // Pagination
        getPaginationRowModel: getPaginationRowModel(),

        // Sorting
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        // Filtering
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        // States
        state: { sorting, columnFilters },
    });

    const { previousPage, getCanPreviousPage, nextPage, getCanNextPage } = table;
    const { getHeaderGroups, getRowModel, getColumn } = table;

    const headerGroups = getHeaderGroups();
    const rowModel = getRowModel();

    return (
        <Card className="w-full border-none bg-transparent print:border-none">
            <CardHeader className="flex-between flex-row !p-0 !pt-4 print:hidden">
                <Filter getColumn={getColumn} filterFor={filterFor} />
            </CardHeader>

            <CardContent className="overflow-hidden rounded-xl border !p-3">
                <Table>
                    <THeader headerGroups={headerGroups} />
                    <TBody colsLen={columns.length} totalFor={totalFor} rowModel={rowModel} smallSize={smallSize} />
                </Table>
            </CardContent>

            <CardFooter className="flex-between gap-4 !p-0 !pt-4 print:hidden">
                <Controllers
                    previousPage={previousPage}
                    nextPage={nextPage}
                    getCanNextPage={getCanNextPage}
                    getCanPreviousPage={getCanPreviousPage}
                />
            </CardFooter>
        </Card>
    );
};

DataTable.displayName = "DataTable";
