"use client";
import { ChartsForm } from "@/components/page-structure/charts-form";
import { CardLoading } from "@/components/loading/card";
import { useGet } from "@/hooks/api/useGet";

type Data = {
    month: string;
    desktop: number;
};

type ProfitsType = {
    year: Data[];
    month: Data[];
};

const Profits = () => {
    const { data, isPending, error } = useGet<ProfitsType>("/api/statistics/profits", ["profits"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error.message}</h1>;

    const { year, month } = data;

    return (
        <ChartsForm
            heading="pages.statistics.profits.heading"
            chart1={{ heading: "pages.statistics.profits.chart-1", data: year }}
            chart2={{ heading: "pages.statistics.profits.chart-2", data: month }}
        />
    );
};

Profits.displayName = "Profits";
export default Profits;
