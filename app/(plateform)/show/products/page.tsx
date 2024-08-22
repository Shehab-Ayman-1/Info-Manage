"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { place } from "@/constants";

import { ComboBox } from "@/components/ui/comboBox";
import { columns } from "./table-columns";

export type MarketProps = {
    _id: string;
    barcode: string;
    product: string;
    min: number;
    count: number;
    price: number;
    total: number;
};

const Market = () => {
    const { mutate, data, error } = useGetByQuery<MarketProps[]>("/api/show/products");
    if (error) return <h1>{error?.message}</h1>;

    const onPlaceChange = (value: string) => {
        mutate(`place=${value}`);
    };

    return (
        <TableForm
            pageTitle="Market Products"
            columns={columns}
            data={data || []}
            filterBy={["barcode", "product", "company", "category"]}
            navigate={[
                { text: "New Statement", to: "/statements/clients" },
                { text: "Transfer Product", to: "/statements/transfer" },
            ]}
        >
            <div className="max-w-64 sm:ml-4">
                <ComboBox label="Place" name="place" items={place} onChange={onPlaceChange} />
            </div>
        </TableForm>
    );
};

Market.displayName = "Market";
export default Market;
