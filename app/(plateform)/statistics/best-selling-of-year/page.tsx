"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

type BestSellingOfYearType = {
    product: string;
    count: number;
};

const BestSellingOfYear = () => {
    const { data, isPending, error } = useGet<BestSellingOfYearType[]>("/api/statistics/best-selling-of-year", []);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.statistics.best-selling-of-the-year.heading"
            data={data}
            columns={columns}
            navigate={[{ text: "open-bill-lists", to: "/clients/bills" }]}
        />
    );
};

BestSellingOfYear.displayName = "BestSellingOfYear";
export default BestSellingOfYear;
