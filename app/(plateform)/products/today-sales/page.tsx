"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { useTranslations } from "next-intl";

type TodaySalesProps = {
    product: string;
    count: number;
    totalSolds: number;
    profits: number;
};

const TodaySales = () => {
    const { data, isPending, error } = useGet<TodaySalesProps[]>("/api/products/today-sales", ["client-bills"]);
    const text = useTranslations("pages");

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle={text("today-sales.heading")}
            data={data}
            columns={columns}
            totalFor="totalSolds"
            filterBy={["product"]}
            navigate={[{ text: "new-statement", to: "/clients/statements/new" }]}
        />
    );
};

TodaySales.displayName = "TodaySales";
export default TodaySales;
