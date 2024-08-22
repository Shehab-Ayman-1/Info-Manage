"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { formatDate } from "date-fns";
import { useEffect, useState } from "react";

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
    const { mutate, data, error } = useGetByQuery<TransactionType[]>("/api/show/transactions");
    const [date, setDate] = useState(dateFormate);

    useEffect(() => {
        if (!date) return;
        mutate(`date=${date}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Transactions List"
            columns={columns}
            data={data || []}
            filterBy={["reason"]}
            navigate={[{ to: "/statements/locker", text: "New Transaction" }]}
        >
            <div className="mt-4 w-fit sm:ml-4">
                <Input type="date" value={date} name="date" onChange={(event) => setDate(() => event.target.value)} />
            </div>
        </TableForm>
    );
};

Transactions.displayName = "Transactions";
export default Transactions;
