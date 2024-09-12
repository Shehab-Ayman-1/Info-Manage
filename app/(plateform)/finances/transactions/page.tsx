"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";
import { Input } from "@/ui/input";

type TransactionType = {
    _id: string;
    username: string;
    reason: string;
    prise: number;
    method: "cash" | "visa";
    process: "withdraw" | "deposit";
    createdAt: Date;
};

const dateFormate = formatDate(new Date(), "yyyy-MM-dd");
const Transactions = () => {
    const { data, isPending, error, mutate } = useGetByQuery<TransactionType[]>("/api/finances/transactions");
    const [date, setDate] = useState(dateFormate);

    useEffect(() => {
        if (!date) return;
        mutate(`date=${date}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.transactions.heading"
            columns={columns}
            data={data || []}
            isPending={isPending}
            navigate={[{ text: "new-transaction", to: "/finances/locker" }]}
        >
            <div className="mt-4 w-fit sm:mx-4">
                <Input type="date" value={date} name="date" onChange={(event) => setDate(() => event.target.value)} />
            </div>
        </TableForm>
    );
};

Transactions.displayName = "Transactions";
export default Transactions;
