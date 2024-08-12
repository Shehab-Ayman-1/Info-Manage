"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { useGet } from "@/hooks/api/useGet";

import { UpdateDialog } from "./updateDialog";
import { DeleteDialog } from "./deleteDialog";
import { columns } from "./table-columns";
import { ClientType } from "./schema";

const ClientsList = () => {
    const { data, isPending, error } = useGet<ClientType>("/api/show/clients", ["clients"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Clients List"
            columns={columns}
            data={data!}
            filterFor="client"
            totalFor="pending"
            navigate={{ to: "/create/client", text: "New Client" }}
        >
            <UpdateDialog />
            <DeleteDialog />
        </TableForm>
    );
};

ClientsList.displayName = "ClientsList";
export default ClientsList;
