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
                <CardHeader className="flex-between flex-row print:hidden">
                    <Heading title={pageTitle} />
                    {navigate && (
                        <Button asChild size="lg" className="w-fit text-base font-bold">
                            <Link href={navigate.to}>{navigate.text}</Link>
                        </Button>
                    )}
                </CardHeader>

                {children}

                <CardFooter>
                    {!!data.length && <DataTable columns={columns} data={data} filterFor={filterFor} totalFor={totalFor} />}
                </CardFooter>
            </CardContent>
        </Card>
    );
};

TableForm.displayName = "TableForm";
