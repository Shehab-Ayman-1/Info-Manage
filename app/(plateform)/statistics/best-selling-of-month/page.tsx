"use client";
import { useEffect, useState } from "react";

import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { Input } from "@/ui/input";

type BestSellingOfMonthProps = {};

const BestSellingOfMonth = ({}: BestSellingOfMonthProps) => {
    const { mutate, data, error } = useGetByQuery<BestSellingOfMonthProps[]>("/api/statistics/best-selling-of-month");
    const [month, setMonth] = useState("");

    useEffect(() => {
        if (!month) return;
        mutate(`month=${month}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month]);

    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            pageTitle="Best Selling Of The Month"
            data={data || []}
            columns={columns}
            navigate={[{ text: "Go To Bills", to: "/clients/bills" }]}
        >
            <Input type="month" className="w-fit" onChange={(event) => setMonth(event.target.value)} />
        </TableForm>
    );
};

BestSellingOfMonth.displayName = "BestSellingOfMonth";
export default BestSellingOfMonth;
