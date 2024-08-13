"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { useOrg } from "@/hooks/useOrg";

import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { DataTable } from "@/components/table";
import { Heading } from "../public/heading";
import { Button } from "@/ui/button";

type TableFormProps<TData> = {
    pageTitle: string;
    navigate?: { to: string; text: string };
    filterBy?: string[];
    data: TData[];
    columns: ColumnDef<any>[];
    totalFor?: string;
    children?: React.ReactNode;
};

export const TableForm = <TData,>({
    pageTitle,
    navigate,
    filterBy,
    columns,
    data,
    totalFor,
    children,
}: TableFormProps<TData>) => {
    const { isAdmin } = useOrg();

    return (
        <Card className="print-bg-transparent print:h-screen">
            <CardContent>
                <CardHeader className="flex-between px-0 sm:flex-row sm:p-4 print:hidden">
                    <Heading title={pageTitle} />

                    {navigate && isAdmin && (
                        <Button asChild size="lg" className="hidden w-fit text-base font-bold sm:inline-flex">
                            <Link href={navigate.to}>{navigate.text}</Link>
                        </Button>
                    )}
                </CardHeader>

                {children}

                <CardFooter className="p-0 sm:px-4">
                    {!!data.length && <DataTable columns={columns} data={data} filterBy={filterBy} totalFor={totalFor} />}
                </CardFooter>
            </CardContent>
        </Card>
    );
};

TableForm.displayName = "TableForm";
