"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { DeleteDialog } from "./delete-dialog";
import { PayDialog } from "./pay-dialog";

type BillType = {
    _id: string;
    client: string;
    state: string;
    total: string;
    paid: string;
    pending: string;
    discount: string;
    created_At: Date;
};

const ClientBills = () => {
    const { data, isPending, error } = useGet<BillType>("/api/show/client-bills", ["bills"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Client Bills List"
            columns={columns}
            data={data}
            filterBy={["client"]}
            totalFor="pending"
            navigate={{ to: "/statements/clients", text: "New Statement" }}
        >
            <DeleteDialog />
            <PayDialog />
        </TableForm>
    );
};

ClientBills.displayName = "ClientBills";
export default ClientBills;
