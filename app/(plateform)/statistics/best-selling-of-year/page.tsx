"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

type BestSellingOfYearProps = {
    product: string;
    count: number;
};

const BestSellingOfYear = () => {
    const { data, isPending, error } = useGet<BestSellingOfYearProps>("/api/statistics/best-selling-of-year", []);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            pageTitle="Best Selling Of The Year"
            data={data || []}
            columns={columns}
            navigate={[{ text: "Go To Bills", to: "/clients/bills" }]}
        />
    );
};

BestSellingOfYear.displayName = "BestSellingOfYear";
export default BestSellingOfYear;
