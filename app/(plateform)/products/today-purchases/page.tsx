"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { DataTable } from "@/components/table";
import { useGet } from "@/hooks/api/useGet";

import { columns as transactionColumns } from "./table-transactions-columns";
import { columns as productColumns } from "./table-products-columns";

type TodayPurchasesProps = {
    products: {
        product: string;
        count: string;
        totalCosts: number;
    }[];
    transactions: {
        creator: string;
        reason: string;
        price: number;
        method: "cash" | "visa";
    }[];
};

const TodayPurchases = () => {
    const { data, isPending, error } = useGet<TodayPurchasesProps>(`/api/products/today-purchases`, ["today-purchases"]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.today-purchases.heading"
            columns={transactionColumns}
            isPending={isPending}
            totalFor="costs"
            data={data?.transactions || []}
            navigate={[{ text: "new-statement", to: "/suppliers/statements/new" }]}
        >
            <div className="sm:px-4">
                <DataTable data={data?.products || []} columns={productColumns} isPending={isPending} totalFor="costs" />
            </div>
        </TableForm>
    );
};

TodayPurchases.displayName = "TodayPurchases";
export default TodayPurchases;
