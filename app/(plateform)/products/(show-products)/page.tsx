"use client";
import { useEffect, useState } from "react";

import { TableForm } from "@/components/page-structure/table-form";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { place } from "@/constants";

import { ComboBox } from "@/components/ui/comboBox";
import { columns } from "./table-columns";

export type Product = {
    _id: string;
    barcode: string;
    product: string;
    min: number;
    count: number;
    price: number;
    total: number;
};

const Market = () => {
    const { data, isPending, error, mutate } = useGetByQuery<Product[]>("/api/products");
    const [location, setLocation] = useState("market");

    useEffect(() => {
        mutate(`place=${location}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle={location === "market" ? "pages.products.market" : "pages.products.store"}
            columns={columns}
            data={data || []}
            isPending={isPending}
            filterBy={["barcode", "product", "company", "category"]}
            navigate={[
                { text: "new-statement", to: "/clients/statements/new" },
                { text: "transfer", to: "/products/transfer" },
            ]}
        >
            <div className="max-w-64 sm:mx-4">
                <ComboBox
                    label="choose-place"
                    name="place"
                    items={place}
                    defaultValue="market"
                    useTranslate={{ label: "public", trigger: "public", item: "public", name: "public" }}
                    onChange={(value) => setLocation(value)}
                />
            </div>
        </TableForm>
    );
};

Market.displayName = "Market";
export default Market;
