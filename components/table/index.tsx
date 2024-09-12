"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useReactTable, ColumnDef, getFilteredRowModel, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { ColumnFiltersState, SortingState, getSortedRowModel } from "@tanstack/react-table";

import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { PaginationCount } from "./pagination-count";
import { Controllers } from "./controllers";
import { THeader } from "./table-header";
import { TBody } from "./table-body";
import { Table } from "@/ui/table";
import { Filter } from "./filter";
import { SelectedItems } from "./selected-items";

type DataTableProps<TData, TValue> = {
    data: TData[];
    totalFor?: string;
    filterBy?: string[];
    isPending?: boolean;
    smallSize?: boolean;
    columns: ColumnDef<TData, TValue>[];
    pagination?: { pageIndex: number; pageSize: number };
    setPagination?: Dispatch<SetStateAction<{ pageIndex: number; pageSize: number }>>;
};

export const DataTable = <TData, TValue>({
    data,
    totalFor,
    filterBy,
    isPending,
    smallSize,
    columns,
    pagination = { pageIndex: 0, pageSize: 1e6 },
    setPagination,
}: DataTableProps<TData, TValue>) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

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

    useEffect(() => {
        table.resetRowSelection();
    }, [data, table]);

    const { previousPage, getCanPreviousPage, nextPage, getCanNextPage } = table;
    const { getHeaderGroups, getRowModel, getColumn } = table;

    const selectedItems = table.getSelectedRowModel();

    const headerGroups = getHeaderGroups();
    const rowModel = getRowModel();

    const totalPaginationCount = table.getPageCount();
    const currentPaginationCount = table.getState().pagination.pageIndex + 1;

    return (
        <Card className="w-full border-none bg-transparent">
            <CardHeader className="flex-between flex-row !p-0 !pt-4">
                <Filter data={data || []} getColumn={getColumn} filterBy={filterBy} />
            </CardHeader>

            <CardContent className="overflow-hidden rounded-xl border border-slate-500 !p-3">
                <Table id="data-table">
                    <THeader headerGroups={headerGroups} />
                    <TBody
                        rowModel={rowModel}
                        totalFor={totalFor}
                        colsLen={columns.length}
                        isPending={isPending}
                        smallSize={smallSize}
                    />
                </Table>
            </CardContent>

            <CardFooter className="flex-between gap-4 !p-0 !pt-4">
                <PaginationCount currentPaginationCount={currentPaginationCount} totalPaginationCount={totalPaginationCount} />
                <Controllers
                    previousPage={previousPage}
                    nextPage={nextPage}
                    getCanNextPage={getCanNextPage}
                    getCanPreviousPage={getCanPreviousPage}
                />
            </CardFooter>

            <SelectedItems items={selectedItems.rows} />
        </Card>
    );
};

DataTable.displayName = "DataTable";
