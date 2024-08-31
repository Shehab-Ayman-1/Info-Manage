"use client";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { useLocale, useTranslations } from "next-intl";
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
    const { mutate, data, error } = useGetByQuery<InsufficientsProps[]>("/api/products/insufficients");
    const [supplierId, setSupplierId] = useState("");
    const [place, setPlace] = useState("");
    const { suppliers } = useLists();
    const text = useTranslations();
    const locale = useLocale();

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
            totalFor="totalNeeded"
            pageTitle={text("pages.insufficient-products.heading")}
            navigate={[{ text: "new-statement", to: "/suppliers/statements/new" }]}
        >
            <div className="flex-between">
                <ComboBox
                    label="choose-supplier"
                    name="supplierId"
                    useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                    loading={suppliers.isLoading}
                    items={[{ _id: "all", value: "all", title: locale === "en" ? "All" : "الكل" }, ...suppliers.lists]}
                    onChange={(value) => setSupplierId(value)}
                />
                <ComboBox
                    label="place"
                    name="place"
                    useTranslate={{ label: "public", name: "public", trigger: "public", item: "public" }}
                    items={places}
                    onChange={(value) => setPlace(value)}
                />
            </div>
        </TableForm>
    );
};

Insufficients.displayName = "Insufficients";
export default Insufficients;
