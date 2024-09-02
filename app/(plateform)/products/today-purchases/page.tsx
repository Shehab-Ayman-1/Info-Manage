"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

type TodayPurchasesProps = {
    product: string;
    count: string;
    totalPurchases: number;
};

const TodayPurchases = () => {
    const { data, isPending, error } = useGet<TodayPurchasesProps[]>("/api/products/today-purchases", ["supplier-bills"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="today-purchases.heading"
            columns={columns}
            data={data}
            filterBy={["product"]}
            totalFor="totalPurchases"
            navigate={[{ text: "new-statement", to: "/suppliers/statements/new" }]}
        />
    );
};

TodayPurchases.displayName = "TodayPurchases";
export default TodayPurchases;
