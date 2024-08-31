"use client";
import { CardLoading } from "@/components/loading/card";

import { TableForm } from "@/components/page-structure/table-form";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

type LeastSellingType = {
    product: string;
    lastSold: Date;
};

const LeastSelling = () => {
    const { data, isPending, error } = useGet<LeastSellingType[]>("/api/statistics/least-selling", ["least-selling"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            pageTitle="Least Selling Products"
            columns={columns}
            data={data}
            filterBy={["product"]}
            navigate={[{ text: "Market Products", to: "/products" }]}
        />
    );
};

LeastSelling.displayName = "LeastSelling";
export default LeastSelling;
