"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { useGet } from "@/hooks/api/useGet";

import { CardLoading } from "@/components/loading/card";
import { columns } from "./table-columns";

export type MarketProps = {
    _id: string;
    product: string;
    min: number;
    max: number;
    count: number;
    price: number;
    total: number;
};

const Market = () => {
    const { data, isPending, error } = useGet<MarketProps>("/api/show/products?place=market", ["market"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Market Products"
            columns={columns}
            data={data!}
            filterFor="product"
            navigate={{ to: "/statements/clients", text: "New Statement" }}
        />
    );
};

Market.displayName = "Market";
export default Market;
