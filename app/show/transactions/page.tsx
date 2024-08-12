"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

type TransactionProps = {
    _id: string;
    username: string;
    reason: string;
    prise: number;
    method: "cash" | "visa";
    process: "withdraw" | "deposit";
    createdAt: Date;
};

const Transactions = () => {
    const { data, isPending, error } = useGet<TransactionProps>("/api/show/transactions", ["transactions"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Transactions List"
            columns={columns}
            data={data!}
            filterBy={["reason"]}
            navigate={{ to: "/statements/locker", text: "New Transaction" }}
        />
    );
};

Transactions.displayName = "Transactions";
export default Transactions;
