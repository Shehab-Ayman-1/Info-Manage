"use client";
import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

type ClientProps = {
    _id: string;
    client: string;
    discount: number;
    solds: number;
    pending: number;
    level: "bronze" | "silver" | "gold";
};

const ClientsList = () => {
    const { data, isPending, error } = useGet<ClientProps>("/api/show/clients", ["clients"]);

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
        />
    );
};

ClientsList.displayName = "ClientsList";
export default ClientsList;
