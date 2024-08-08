"use client";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "@/ui/card";
import { DataTable } from "@/components/table";
import { Heading } from "@/components/heading";
import { useLists } from "@/hooks/data/useLists";
import { SelectBox } from "@/components/select";
import { place as places } from "@/constants";
import { columns } from "./table-columns";

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

        const supplier = suppliers.data.find((supplier) => supplier._id === supplierId);
        mutate(`place=${place}&supplier=${supplier?.name}`);
    }, [place, supplierId, suppliers, mutate]);

    if (error) return <h1>{error.message}</h1>;

    return (
        <Card>
            <CardHeader>
                <Heading title="Insufficients Products" />
                <div className="flex-between">
                    <SelectBox
                        label="Supplier"
                        name="supplierId"
                        loading={suppliers.isLoading}
                        items={suppliers.lists}
                        onChange={(value) => setSupplierId(value)}
                    />
                    <SelectBox label="Place" name="place" items={places} onChange={(value) => setPlace(value)} />
                </div>
            </CardHeader>

            <CardContent>{supplierId && place && <DataTable columns={columns} data={data || []} totalFor="total" />}</CardContent>
        </Card>
    );
};

Insufficients.displayName = "Insufficients";
export default Insufficients;
