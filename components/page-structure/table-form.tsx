"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useReactToPrint } from "react-to-print";
import { PrinterCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Heading } from "@/components/public/heading";
import { DataTable } from "@/components/table";
import { useOrg } from "@/hooks/useOrg";
import { Button } from "@/ui/button";

type TableFormProps<TData> = {
    data: TData[];
    pageTitle: string;
    totalFor?: string;
    filterBy?: string[];
    isPending?: boolean;
    children?: React.ReactNode;
    columns: ColumnDef<any>[];
    navigate?: { to: string; text: string }[];
};

export const TableForm = <TData,>(props: TableFormProps<TData>) => {
    const { pageTitle, navigate, filterBy, isPending, columns, data, totalFor, children } = props;

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
    const { isAdmin } = useOrg();
    const t = useTranslations();

    const onPrint = useReactToPrint({
        onAfterPrint: () => setPagination((pagination) => ({ ...pagination, pageIndex: 0, pageSize: 20 })),
        content: () => document.getElementById("data-table"),
        documentTitle: pageTitle,
        pageStyle: "p-4 border border-slate-500",
    });

    const onPrintTrigger = () => {
        setPagination((pagination) => ({ ...pagination, pageIndex: 0, pageSize: 1e6 }));
        setTimeout(onPrint, 0);
    };

    return (
        <Card className="">
            <CardContent>
                <CardHeader className="flex-between px-0 sm:flex-row sm:p-4">
                    <div className="flex flex-col gap-y-6">
                        <Heading title={pageTitle} />
                        {!!data?.length && (
                            <Button type="button" size="lg" className="gap-2 text-lg font-bold" onClick={onPrintTrigger}>
                                <PrinterCheckIcon className="size-5 !text-white" />
                                <span>{t("table.print")}</span>
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-col gap-y-6">
                        {navigate &&
                            isAdmin &&
                            navigate.map(({ text, to }, index) => (
                                <Button
                                    key={index}
                                    asChild
                                    type="button"
                                    size="lg"
                                    className="hidden w-full text-base font-bold sm:inline-flex"
                                >
                                    <Link href={to}>{t(`buttons.${text}`)}</Link>
                                </Button>
                            ))}
                    </div>
                </CardHeader>

                {children}

                <CardFooter className="p-0 sm:px-4">
                    <DataTable
                        columns={columns}
                        data={data}
                        filterBy={filterBy}
                        totalFor={totalFor}
                        isPending={isPending}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </CardFooter>
            </CardContent>
        </Card>
    );
};

TableForm.displayName = "TableForm";
