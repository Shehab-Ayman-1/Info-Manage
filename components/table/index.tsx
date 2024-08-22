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
import PaginationCount from "./pagination-count";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterBy?: string[];
    totalFor?: string;
    smallSize?: boolean;
};

export const DataTable = <TData, TValue>({ columns, data, filterBy, totalFor, smallSize }: DataTableProps<TData, TValue>) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

    const table = useReactTable({
        data,

        // Columns
        columns,

        // Rows
        getCoreRowModel: getCoreRowModel(),

        // Pagination
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,

        // Sorting
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        // Filtering
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        // States
        state: { sorting, columnFilters, pagination },
    });

    const { previousPage, getCanPreviousPage, nextPage, getCanNextPage } = table;
    const { getHeaderGroups, getRowModel, getColumn } = table;

    const headerGroups = getHeaderGroups();
    const rowModel = getRowModel();

    const totalPaginationCount = table.getPageCount();
    const currentPaginationCount = table.getState().pagination.pageIndex + 1;

    return (
        <Card className="w-full border-none bg-transparent">
            <CardHeader className="flex-between flex-row !p-0 !pt-4 print:hidden">
                <Filter data={data || []} getColumn={getColumn} filterBy={filterBy} />
            </CardHeader>

            <CardContent className="overflow-hidden rounded-xl border border-slate-500 !p-3">
                <Table>
                    <THeader headerGroups={headerGroups} />
                    <TBody colsLen={columns.length} totalFor={totalFor} rowModel={rowModel} smallSize={smallSize} />
                </Table>
            </CardContent>

            <CardFooter className="flex-between gap-4 !p-0 !pt-4 print:hidden">
                <PaginationCount currentPaginationCount={currentPaginationCount} totalPaginationCount={totalPaginationCount} />
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
