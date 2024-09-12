"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";

import { DatePickerWithRange } from "@/components/ui/calender";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";

type TransactionType = {
    _id: string;
    username: string;
    reason: string;
    prise: number;
    method: "cash" | "visa";
    process: "withdraw" | "deposit";
    createdAt: Date;
};

const Transactions = () => {
    const { data, isPending, error, mutate } = useGetByQuery<TransactionType[]>("/api/finances/transactions");
    const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: undefined });

    useEffect(() => {
        if (!date) return;
        mutate(`startDate=${date.from}&endDate=${date.to}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.transactions.heading"
            data={data || []}
            columns={columns}
            isPending={isPending}
            navigate={[{ text: "new-transaction", to: "/finances/locker" }]}
        >
            <div className="mt-4 w-fit sm:mx-4">
                <DatePickerWithRange date={date} setDate={setDate} />
            </div>
        </TableForm>
    );
};

Transactions.displayName = "Transactions";
export default Transactions;
