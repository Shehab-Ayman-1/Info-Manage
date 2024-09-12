"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { UpdateDialog } from "./update-dialog";
import { DeleteDialog } from "./delete-dialog";
import { PaymentDialog } from "./pay-dialog";
import { ClientType } from "./schema";

const ClientList = () => {
    const { data, isPending, error } = useGet<ClientType[]>("/api/clients", ["clients"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.client-lists.heading"
            data={data}
            columns={columns}
            isPending={isPending}
            totalFor="pending"
            filterBy={["client"]}
            navigate={[{ text: "new-client", to: "/clients/add-client" }]}
        >
            <UpdateDialog />
            <DeleteDialog />
            <PaymentDialog />
        </TableForm>
    );
};

ClientList.displayName = "ClientList";
export default ClientList;
