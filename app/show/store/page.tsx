"use client";
import type { MarketProps } from "../market/page";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { useGet } from "@/hooks/api/useGet";

const Store = () => {
    const { data, isPending, error } = useGet<MarketProps>("/api/show/products?place=store", ["store"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Store Products"
            columns={columns}
            data={data!}
            filterFor="product"
            navigate={{ to: "/statements/suppliers", text: "New Statement" }}
        />
    );
};

Store.displayName = "Store";
export default Store;
