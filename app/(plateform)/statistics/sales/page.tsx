"use client";
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

    if (isPending) return <h1>Loading...</h1>;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <ChartsForm
            heading="Sales Statistics"
            chart1={{ heading: "Sales Of The Year", data: data?.[0]?.year || [] }}
            chart2={{ heading: "Sales Of The Month", data: data?.[0]?.month || [] }}
        />
    );
};

Sales.displayName = "Sales";
export default Sales;
