"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";
import { SupplierType } from "./schema";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { UpdateDialog } from "./updateDialog";
import { DeleteDialog } from "./deleteDialog";

const Suppliers = () => {
    const { data, isPending, error } = useGet<SupplierType>("/api/show/suppliers", ["suppliers"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Suppliers List"
            columns={columns}
            data={data!}
            filterBy={["supplier"]}
            totalFor="pending"
            navigate={{ to: "/create/supplier", text: "New Supplier" }}
        >
            <UpdateDialog />
            <DeleteDialog />
        </TableForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
