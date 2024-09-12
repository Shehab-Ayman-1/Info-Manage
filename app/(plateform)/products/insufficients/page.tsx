"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { useLists } from "@/hooks/data/useLists";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { AlertError } from "@/components/ui/alert-error";
import { ComboBox } from "@/components/ui/comboBox";
import { StatementDialog } from "./statement-dialog";
import { place as places } from "@/constants";
import { TransferDialog } from "./transfer-dialog";

type InsufficientsProps = {
    _id: string;
    product: string;
    price: number;
    currentCount: number;
    neededCount: number;
    totalCost: number;
};

const Insufficients = () => {
    const [supplierId, setSupplierId] = useState("");
    const [place, setPlace] = useState("");
    const { suppliers } = useLists();

    const { data, isPending, error, mutate } = useGetByQuery<InsufficientsProps[]>(`/api/products/insufficients`, [
        "insufficients",
    ]);

    const mount = useRef(false);
    const locale = useLocale();

    useEffect(() => {
        if (mount.current) return;
        (async () => suppliers.fetcher())();
        mount.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!supplierId || !place) return;
        mutate(`supplierId=${supplierId}&place=${place}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [place, supplierId]);

    if (error) return <h1>{error.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.insufficient-products.heading"
            columns={columns}
            data={data || []}
            isPending={isPending}
            selectedSubmitButtons={["buy", "transfer"]}
            totalFor="totalNeeded"
            navigate={[
                { text: "new-statement", to: "/suppliers/statements/new" },
                { text: "transfer", to: "/products/transfer" },
            ]}
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

            {supplierId !== "all" && <StatementDialog supplierId={supplierId} place={place} mutateGetQuery={mutate} />}
            <TransferDialog place={place} mutateGetQuery={mutate} />

            {supplierId === "all" && <AlertError root={{ message: "Can Not Create New Statement With All Suppliers Choosen" }} />}
        </TableForm>
    );
};

Insufficients.displayName = "Insufficients";
export default Insufficients;
