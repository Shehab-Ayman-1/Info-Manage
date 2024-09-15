"use client";

import { TableForm } from "@/components/page-structure/table-form";
import { DataTable } from "@/components/table";
import { useGet } from "@/hooks/api/useGet";

import { columns as transactionColumns } from "./table-transactions-columns";
import { columns as productColumns } from "./table-products-columns";

type TodaySalesProps = {
    products: {
        product: string;
        count: number;
        costs: number;
        profits: number;
    }[];
    transactions: {
        creator: string;
        reason: string;
        method: string;
        costs: string;
    }[];
};

const TodaySales = () => {
    const { data, isPending, error } = useGet<TodaySalesProps>("/api/products/today-sales", ["client-invoices"]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.today-sales.heading"
            columns={transactionColumns}
            isPending={isPending}
            totalFor="costs"
            data={data?.transactions || []}
            navigate={[{ text: "new-statement", to: "/clients/statements/new" }]}
        >
            <div className="sm:px-4">
                <DataTable data={data?.products || []} columns={productColumns} isPending={isPending} totalFor="costs" />
            </div>
        </TableForm>
    );
};

TodaySales.displayName = "TodaySales";
export default TodaySales;
