"use client";
import { useEffect, useState } from "react";

import { TableForm } from "@/components/page-structure/table-form";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";
import { Input } from "@/ui/input";

const data = [
    { _id: "1", product: "rubber", count: 33 },
    { _id: "2", product: "wagon", count: 30 },
    { _id: "3", product: "guide", count: 29 },
    { _id: "4", product: "bark", count: 22 },
    { _id: "5", product: "man", count: 73 },
    { _id: "6", product: "limited", count: 3 },
    { _id: "7", product: "independent", count: 5 },
    { _id: "8", product: "six", count: 4 },
    { _id: "9", product: "unknown", count: 75 },
    { _id: "10", product: "win", count: 75 },
    { _id: "11", product: "search", count: 7 },
    { _id: "12", product: "dinner", count: 94 },
    { _id: "13", product: "local", count: 52 },
    { _id: "14", product: "powder", count: 46 },
    { _id: "15", product: "know", count: 77 },
    { _id: "16", product: "shop", count: 72 },
];

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
            navigate={{ text: "Go To Bills", to: "/show/clients-bills" }}
        >
            <Input type="month" className="w-fit" onChange={(event) => setMonth(event.target.value)} />
        </TableForm>
    );
};

BestSellingOfMonth.displayName = "BestSellingOfMonth";
export default BestSellingOfMonth;
