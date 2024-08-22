"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { DataTable } from "@/components/table";
import { Heading } from "../public/heading";
import { useOrg } from "@/hooks/useOrg";
import { Button } from "@/ui/button";

type TableFormProps<TData> = {
    pageTitle: string;
    navigate?: { to: string; text: string }[];
    filterBy?: string[];
    data: TData[];
    columns: ColumnDef<any>[];
    totalFor?: string;
    children?: React.ReactNode;
};

export const TableForm = <TData,>(props: TableFormProps<TData>) => {
    const { pageTitle, navigate, filterBy, columns, data, totalFor, children } = props;
    const { isAdmin } = useOrg();

    return (
        <Card className="print-bg-transparent print:h-screen">
            <CardContent>
                <CardHeader className="flex-between px-0 sm:flex-row sm:p-4 print:hidden">
                    <div className="flex flex-col gap-y-6">
                        <Heading title={pageTitle} />
                        {!!data?.length && (
                            <Button size="lg" className="text-lg font-bold print:hidden" onClick={print}>
                                Print Receipt
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-col gap-y-6">
                        {navigate &&
                            isAdmin &&
                            navigate.map(({ text, to }, index) => (
                                <Button
                                    asChild
                                    key={index}
                                    size="lg"
                                    className="hidden w-full text-base font-bold sm:inline-flex"
                                >
                                    <Link href={to}>{text}</Link>
                                </Button>
                            ))}
                    </div>
                </CardHeader>

                {children}

                <CardFooter className="p-0 sm:px-4">
                    <DataTable columns={columns} data={data} filterBy={filterBy} totalFor={totalFor} />
                </CardFooter>
            </CardContent>
        </Card>
    );
};

TableForm.displayName = "TableForm";
