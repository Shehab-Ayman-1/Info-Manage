import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { DataTable } from "@/components/table";
import { Button } from "@/ui/button";
import { Heading } from "../heading";

type TableFormProps<TData> = {
    pageTitle: string;
    navigate?: { to: string; text: string };
    filterFor?: string;
    data: TData[];
    columns: ColumnDef<any>[];
    totalFor?: string;
    children?: React.ReactNode;
};

export const TableForm = <TData,>({
    pageTitle,
    navigate,
    filterFor,
    columns,
    data,
    totalFor,
    children,
}: TableFormProps<TData>) => {
    return (
        <Card className="print-bg-transparent print:h-screen">
            <CardContent>
                <CardHeader className="flex-between px-0 sm:flex-row sm:p-4 print:hidden">
                    <Heading title={pageTitle} />

                    {navigate && (
                        <Button asChild size="lg" className="hidden w-fit text-base font-bold sm:inline-flex">
                            <Link href={navigate.to}>{navigate.text}</Link>
                        </Button>
                    )}
                </CardHeader>

                {children}

                <CardFooter className="p-0 sm:px-4">
                    {!!data.length && <DataTable columns={columns} data={data} filterFor={filterFor} totalFor={totalFor} />}
                </CardFooter>
            </CardContent>
        </Card>
    );
};

TableForm.displayName = "TableForm";
