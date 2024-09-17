"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useGet } from "@/hooks/api/useGet";
import { place } from "@/constants";

import { TransferDialog } from "@/widgets/products/insufficients/transfer-dialog";
import { TableForm } from "@/components/page-structure/table-form";
import { ComboBox } from "@/components/ui/comboBox";
import { columns } from "./table-columns";
import { animate } from "@/constants";

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
    const [location, setLocation] = useState("market");
    const { data, isPending, error, refetch } = useGet<Product[]>(`/api/products?place=${location}`, ["products"]);

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle={location === "market" ? "pages.products.market" : "pages.products.store"}
            columns={columns}
            data={data || []}
            isPending={isPending}
            selectedSubmitButtons={["transfer"]}
            filterBy={["barcode", "product", "company", "category"]}
            navigate={[
                { text: "new-statement", to: "/clients/statements/new" },
                { text: "transfer", to: "/products/transfer" },
            ]}
        >
            <motion.div {...animate("opacity")} className="max-w-[22rem] sm:mx-4">
                <ComboBox
                    label="choose-place"
                    name="place"
                    useTranslate={{ label: "public", trigger: "public", item: "public", name: "public" }}
                    items={place}
                    defaultValue="market"
                    onChange={(value) => setLocation(value)}
                    isSmallContent
                />
                <TransferDialog place={location} />
            </motion.div>
        </TableForm>
    );
};

Market.displayName = "Market";
export default Market;
