"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

type SupplierProps = {};

const Suppliers = () => {
    const { data, isPending, error } = useGet<SupplierProps>("/api/show/suppliers", ["suppliers"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Suppliers List"
            columns={columns}
            data={data!}
            filterFor="supplier"
            totalFor="pending"
            navigate={{ to: "/create/supplier", text: "New Supplier" }}
        />
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
