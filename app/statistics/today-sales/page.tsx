"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { Button } from "@/ui/button";

type TodaySalesProps = {};

const TodaySales = ({}: TodaySalesProps) => {
    const { data, isPending, error } = useGet<[]>("/api/statistics/today-sales", ["sales"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Today Sales"
            columns={columns}
            data={data}
            totalFor="total"
            navigate={{ to: "/statements/clients", text: "New Statement" }}
        >
            <div className="text-center">
                <Button className="ml-6 text-lg font-bold print:hidden" size="lg" onClick={print}>
                    Print Receipt
                </Button>
            </div>
        </TableForm>
    );
};

TodaySales.displayName = "TodaySales";
export default TodaySales;
