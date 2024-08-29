"use client";
import { CardLoading } from "@/components/loading/card";
import { ChartsForm } from "@/components/page-structure/charts-form";
import { useGet } from "@/hooks/api/useGet";

type Data = {
    month: string;
    desktop: number;
};

type ResponseType = {
    year: Data[];
    month: Data[];
};

const Sales = () => {
    const { data, isPending, error } = useGet<ResponseType>("/api/statistics/sales", ["sales"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <ChartsForm
            heading="Sales Statistics"
            chart1={{ heading: "Sales Of The Year", data: data.year }}
            chart2={{ heading: "Sales Of The Month", data: data.month }}
        />
    );
};

Sales.displayName = "Sales";
export default Sales;
