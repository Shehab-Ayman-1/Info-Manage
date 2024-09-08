"use client";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { Input } from "@/ui/input";

type BestSellingOfMonthProps = {};

const BestSellingOfMonth = ({}: BestSellingOfMonthProps) => {
    const { mutate, data, error } = useGetByQuery<BestSellingOfMonthProps[]>("/api/statistics/best-selling-of-month");
    const [month, setMonth] = useState(formatDate(new Date(), "yyyy-MM"));

    useEffect(() => {
        if (!month) return;
        mutate(`month=${month}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month]);

    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.statistics.best-selling-of-the-month.heading"
            data={data || []}
            columns={columns}
            navigate={[{ text: "open-invoice-lists", to: "/clients/invoices" }]}
        >
            <Input type="month" className="w-fit" value={month} onChange={(event) => setMonth(event.target.value)} />
        </TableForm>
    );
};

BestSellingOfMonth.displayName = "BestSellingOfMonth";
export default BestSellingOfMonth;
