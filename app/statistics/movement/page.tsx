"use client";
import { useEffect, useState } from "react";

import { ChartsForm } from "@/components/page-structure/charts-form";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { useLists } from "@/hooks/data/useLists";

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
    const [productId, setProductId] = useState("");
    const { products } = useLists();

    useEffect(() => {
        (async () => await products.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!productId) return;
        const product = products.data.find((product) => product._id === productId);
        mutate(`productName=${product?.name}&companyId=${product?.company?._id}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <ChartsForm
            heading="Product Movement"
            chart1={{ heading: "Purchases", data: data?.purchases || [] }}
            chart2={{ heading: "Sales", data: data?.sales || [] }}
            loading={products.isLoading}
            groups={products.groups}
            setProductId={setProductId}
        />
    );
};

Movement.displayName = "Movement";
export default Movement;
