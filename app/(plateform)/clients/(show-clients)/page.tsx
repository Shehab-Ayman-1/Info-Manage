"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { useGet } from "@/hooks/api/useGet";

import { UpdateDialog } from "./update-dialog";
import { DeleteDialog } from "./delete-dialog";
import { columns } from "./table-columns";
import { ClientType } from "./schema";

const ClientList = () => {
    const { data, isPending, error } = useGet<ClientType>("/api/clients", ["clients"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Client List"
            columns={columns}
            data={data!}
            filterBy={["client", "level"]}
            totalFor="pending"
            navigate={[{ text: "New Client", to: "/clients/add-client" }]}
        >
            <UpdateDialog />
            <DeleteDialog />
        </TableForm>
    );
};

ClientList.displayName = "ClientList";
export default ClientList;
