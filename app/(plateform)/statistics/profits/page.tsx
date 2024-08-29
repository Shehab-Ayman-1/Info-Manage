"use client";
import { CardLoading } from "@/components/loading/card";
import { ChartsForm } from "@/components/page-structure/charts-form";
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
            heading="Profits Statistics"
            chart1={{ heading: "Profits Of The Year", data: year }}
            chart2={{ heading: "Profits Of The Month", data: month }}
        />
    );
};

Profits.displayName = "Profits";
export default Profits;
