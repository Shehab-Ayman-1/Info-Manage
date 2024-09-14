"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { DeleteItemByRequest } from "@/widgets/public/delete-item-by-request";
import { UpdateDialog } from "@/widgets/clients/client-lists/update-client-dialog";
import { PaymentDialog } from "@/widgets/public/payment-dialog";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
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

            <DeleteItemByRequest
                apiUrl="/api/clients"
                dialogType="client-lists-delete-model"
                queryKeys={["clients"]}
                requestKeys={{ senderId: "clientId", dataId: "clientId" }}
            />

            <PaymentDialog
                dataId="clientId"
                apiUrl="/api/clients"
                queryKeys={["clients"]}
                dialogType="client-lists-payment-model"
            />
        </TableForm>
    );
};

ClientList.displayName = "ClientList";
export default ClientList;
