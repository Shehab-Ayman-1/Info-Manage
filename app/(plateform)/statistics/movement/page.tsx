"use client";
import { useEffect, useState } from "react";

import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { useLists } from "@/hooks/data/useLists";

import { ChartsForm } from "@/components/page-structure/charts-form";
import { ComboBox } from "@/components/ui/comboBox";

type Data = {
    month: string;
    desktop: number;
};

type ResponseType = {
    purchases: Data[];
    sales: Data[];
};

const Movement = () => {
    const { mutate, data, error } = useGetByQuery<ResponseType>("/api/statistics/movement");
    const { suppliers, productsBySupplier } = useLists();
    const [supplierId, setSupplierId] = useState("");
    const [productId, setProductId] = useState("");

    useEffect(() => {
        (async () => await suppliers.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!supplierId) return;
        setProductId("");

        (async () => await productsBySupplier.fetcher?.(supplierId))();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierId]);

    useEffect(() => {
        if (!supplierId || !productId) return;

        const product = productsBySupplier.data.find((product) => product._id === productId);
        if (!product) return;

        mutate(`productName=${product.name}&productId=${product._id}&supplierId=${supplierId}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierId, productId]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <ChartsForm
            heading="pages.statistics.movement.heading"
            chart1={{ heading: "pages.statistics.movement.chart-1", data: data?.purchases || [] }}
            chart2={{ heading: "pages.statistics.movement.chart-2", data: data?.sales || [] }}
        >
            <div className="flex-between">
                <ComboBox
                    label="choose-supplier"
                    name="supplierId"
                    useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                    loading={suppliers.isLoading}
                    items={suppliers.lists}
                    onChange={(value) => setSupplierId(value)}
                />
                <ComboBox
                    label="choose-product"
                    name="productId"
                    useTranslate={{ label: "public", name: "public", trigger: "public", customeTrigger: true }}
                    loading={productsBySupplier.isLoading}
                    groups={productsBySupplier.groups}
                    onChange={(value) => setProductId(value)}
                />
            </div>
        </ChartsForm>
    );
};

Movement.displayName = "Movement";
export default Movement;
