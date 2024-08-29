"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { UpdateProductsDialog } from "./update-product-dialog";
import { UpdateDialog } from "./update-dialog";
import { DeleteDialog } from "./delete-dialog";
import { SupplierType } from "./types";

const Suppliers = () => {
    const { data, isPending, error } = useGet<SupplierType[]>("/api/suppliers", ["suppliers"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Supplier List"
            columns={columns}
            data={data}
            totalFor="pending"
            filterBy={["supplier"]}
            navigate={[{ text: "New Supplier", to: "/suppliers/add-supplier" }]}
        >
            <UpdateDialog />
            <DeleteDialog />
            <UpdateProductsDialog />
        </TableForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
