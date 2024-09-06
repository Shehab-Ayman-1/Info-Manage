"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { RestoreDialog } from "./restore-dialog";

type TrashProductsType = {
    category: string;
    company: string;
    product: string;
    barcode: string;
    unit: string;
    marketCount: string;
    storeCount: string;
};

const TrashProducts = () => {
    const { data, isPending, error } = useGet<TrashProductsType[]>("/api/products/trash", ["trash-products"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.trash-products.heading"
            columns={columns}
            data={data}
            navigate={[{ text: "new-statement", to: "/clients/statements/new" }]}
        >
            <RestoreDialog />
        </TableForm>
    );
};

TrashProducts.displayName = "TrashProducts";
export default TrashProducts;
