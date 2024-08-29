"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

type TodayPurchasesProps = {};

const TodayPurchases = () => {
    const { data, isPending, error } = useGet<TodayPurchasesProps>("/api/products/today-purchases", ["supplier-bills"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Today Purchases"
            columns={columns}
            data={data!}
            filterBy={["product"]}
            totalFor="totalPurchases"
            navigate={[{ text: "New Statement", to: "/suppliers/statements/new" }]}
        />
    );
};

TodayPurchases.displayName = "TodayPurchases";
export default TodayPurchases;
