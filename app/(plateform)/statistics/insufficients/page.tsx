"use client";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { useEffect, useState } from "react";

import { useLists } from "@/hooks/data/useLists";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { ComboBox } from "@/components/ui/comboBox";
import { place as places } from "@/constants";

type InsufficientsProps = {
    _id: string;
    product: string;
    price: number;
    current_count: number;
    needed_count: number;
    total_cost: number;
};

const Insufficients = () => {
    const { mutate, data, error } = useGetByQuery<InsufficientsProps[]>("/api/statistics/insufficients");
    const [supplierId, setSupplierId] = useState("");
    const [place, setPlace] = useState("");
    const { suppliers } = useLists();

    useEffect(() => {
        (async () => await suppliers.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!supplierId || !place) return;
        mutate(`place=${place}&supplierId=${supplierId}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [place, supplierId]);

    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            columns={columns}
            data={data || []}
            totalFor="total"
            pageTitle="Insufficients Products"
            navigate={{ text: "New Statement", to: "/statements/suppliers" }}
        >
            <div className="flex-between">
                <ComboBox
                    label="Supplier"
                    name="supplierId"
                    loading={suppliers.isLoading}
                    items={suppliers.lists}
                    onChange={(value) => setSupplierId(value)}
                />
                <ComboBox label="Place" name="place" items={places} onChange={(value) => setPlace(value)} />
            </div>
        </TableForm>
    );
};

Insufficients.displayName = "Insufficients";
export default Insufficients;
