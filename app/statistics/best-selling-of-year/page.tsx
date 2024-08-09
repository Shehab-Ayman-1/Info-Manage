"use client";
import { useEffect, useState } from "react";

import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";
import { years } from "@/constants";

import { TableForm } from "@/components/page-structure/table-form";
import { SelectBox } from "@/components/ui/select";
import { cn } from "@/utils/shadcn";

type BestSellingOfYearProps = {
    product: string;
    count: number;
};

const BestSellingOfYear = () => {
    const { mutate, data, isPending, error } = useGetByQuery<BestSellingOfYearProps[]>("/api/statistics/best-selling-of-year");
    const [year, setYear] = useState("");

    useEffect(() => {
        if (!year) return;
        mutate(`year=${year}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            pageTitle="Best Selling Of The Year"
            filterFor=""
            data={data || []}
            columns={columns}
            navigate={{ text: "Go To Bills", to: "/show/clients-bills" }}
        >
            <SelectBox
                label="Years"
                name="years"
                items={years}
                className={cn("max-w-64", isPending && "pointer-events-none")}
                onChange={(value) => setYear(value)}
            />
        </TableForm>
    );
};

BestSellingOfYear.displayName = "BestSellingOfYear";
export default BestSellingOfYear;
