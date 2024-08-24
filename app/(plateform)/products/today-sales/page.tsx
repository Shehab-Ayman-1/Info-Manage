"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

type TodaySalesProps = {};

const TodaySales = ({}: TodaySalesProps) => {
    const { data, isPending, error } = useGet<[]>("/api/products/today-sales", ["sales"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Today Sales"
            columns={columns}
            data={data}
            filterBy={["product"]}
            totalFor="totalSolds"
            navigate={[{ text: "New Statement", to: "/clients/statement" }]}
        />
    );
};

TodaySales.displayName = "TodaySales";
export default TodaySales;
