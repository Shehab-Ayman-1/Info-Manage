"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";
import { SupplierType } from "./types";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

import { UpdateProductsDialog } from "./update-product-dialog";
import { UpdateDialog } from "./update-dialog";
import { DeleteDialog } from "./delete-dialog";

const Suppliers = () => {
    const { data, isPending, error } = useGet<SupplierType>("/api/show/suppliers", ["suppliers"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Supplier List"
            columns={columns}
            data={data!}
            filterBy={["supplier"]}
            totalFor="pending"
            navigate={[{ to: "/create/supplier", text: "New Supplier" }]}
        >
            <UpdateDialog />
            <DeleteDialog />
            <UpdateProductsDialog />
        </TableForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
