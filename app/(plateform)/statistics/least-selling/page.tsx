"use client";
import { CardLoading } from "@/components/loading/card";

import { TableForm } from "@/components/page-structure/table-form";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";
import { useEffect, useState } from "react";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/calender";

type LeastSellingType = {
    product: string;
    lastSold: Date;
};

const LeastSelling = () => {
    const [date, setDate] = useState<DateRange | undefined>({ from: subDays(new Date(), 30), to: new Date() });
    const { data, isPending, error, refetch } = useGet<LeastSellingType[]>(
        `/api/statistics/least-selling?startDate=${date?.from}&endDate=${date?.to}`,
        ["least-selling"],
    );

    useEffect(() => {
        refetch();
    }, [date, refetch]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.statistics.least-selling.heading"
            columns={columns}
            data={data}
            isPending={isPending}
            filterBy={["product"]}
            navigate={[{ text: "market-products", to: "/products" }]}
        >
            <div className="mt-4 w-fit sm:mx-4">
                <DatePickerWithRange date={date} setDate={setDate} />
            </div>
        </TableForm>
    );
};

LeastSelling.displayName = "LeastSelling";
export default LeastSelling;
