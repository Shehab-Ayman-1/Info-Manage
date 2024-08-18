"use client";
import { useEffect, useState } from "react";

import { ChartsForm } from "@/components/page-structure/charts-form";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { useLists } from "@/hooks/data/useLists";
import { SelectBox } from "@/components/ui/select";

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
    const [supplierId, setSupplierId] = useState("");
    const [productId, setProductId] = useState("");
    const { suppliers, productsBySupplier } = useLists();

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

        const { name, company } = product;
        mutate(`productName=${name}&companyId=${company._id}&supplierId=${supplierId}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierId, productId]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <ChartsForm
            heading="Product Movement"
            chart1={{ heading: "Purchases", data: data?.purchases || [] }}
            chart2={{ heading: "Sales", data: data?.sales || [] }}
        >
            <div className="flex-between">
                <SelectBox
                    label="Supplier"
                    name="supplierId"
                    loading={suppliers.isLoading}
                    items={suppliers.lists}
                    onChange={(value) => setSupplierId(value)}
                />
                <SelectBox
                    label="Product"
                    name="productId"
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
