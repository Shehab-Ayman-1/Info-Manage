"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { UpdateSupplierProducts } from "@/widgets/suppliers/supplier-lists/update-supplier-products";
import { DeleteItemByRequest } from "@/widgets/public/delete-item-by-request";
import { UpdateSupplier } from "@/widgets/suppliers/supplier-lists/update-supplier";
import { PaymentDialog } from "@/widgets/public/payment-dialog";
import { SupplierType } from "./types";

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
            <UpdateSupplierProducts />

            <UpdateSupplier />

            <DeleteItemByRequest
                apiUrl="/api/suppliers"
                dialogType="suppliers-delete-model"
                queryKeys={["suppliers"]}
                requestKeys={{ senderId: "supplierId", dataId: "supplierId" }}
            />

            <PaymentDialog
                apiUrl="/api/suppliers"
                dataId="supplierId"
                dialogType="suppliers-payment-model"
                queryKeys={["suppliers"]}
            />
        </TableForm>
    );
};

Suppliers.displayName = "Suppliers";
export default Suppliers;
