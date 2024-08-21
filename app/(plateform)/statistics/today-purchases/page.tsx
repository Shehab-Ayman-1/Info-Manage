"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

type TodayPurchasesProps = {};

const TodayPurchases = () => {
    const { data, isPending, error } = useGet<TodayPurchasesProps>("/api/statistics/today-purchases", ["purchases"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Today Purchases"
            columns={columns}
            data={data!}
            totalFor="total"
            navigate={{ to: "/statements/suppliers", text: "New Statement" }}
        />
    );
};

TodayPurchases.displayName = "TodayPurchases";
export default TodayPurchases;
