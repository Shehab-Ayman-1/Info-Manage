"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { UpdateProductsDialog } from "./update-product-dialog";
import { UpdateDialog } from "./update-dialog";
import { DeleteDialog } from "./delete-dialog";
import { SupplierType } from "./types";
import { PaymentDialog } from "./pay-dialog";

const Suppliers = () => {
    const { data, isPending, error } = useGet<SupplierType[]>("/api/suppliers", ["suppliers"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.supplier-lists.heading"
            columns={columns}
            data={data}
            isPending={isPending}
            totalFor="pending"
            filterBy={["supplier"]}
            navigate={[
                { text: "new-supplier", to: "/suppliers/add-supplier" },
                { text: "new-statement", to: "/suppliers/statements/new" },
            ]}
        >
            <UpdateDialog />
            <DeleteDialog />
            <PaymentDialog />
            <UpdateProductsDialog />
        </TableForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
