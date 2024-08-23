"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PrinterCheckIcon } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Heading } from "@/components/public/heading";
import { DataTable } from "@/components/table";
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
        <Card className="print:h-screen print:!px-0">
            <CardContent>
                <CardHeader className="flex-between px-0 sm:flex-row sm:p-4 print:hidden">
                    <div className="flex flex-col gap-y-6">
                        <Heading title={pageTitle} />
                        {!!data?.length && (
                            <Button size="lg" className="gap-1 text-lg font-bold print:hidden" onClick={print}>
                                <PrinterCheckIcon className="size-5 !text-white dark:!text-black" />
                                <span>Print Receipt</span>
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

                <CardFooter className="p-0 sm:px-4 print:!px-0">
                    <DataTable columns={columns} data={data} filterBy={filterBy} totalFor={totalFor} />
                </CardFooter>
            </CardContent>
        </Card>
    );
};

TableForm.displayName = "TableForm";
