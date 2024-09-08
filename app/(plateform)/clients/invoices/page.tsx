"use client";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

import { TableForm } from "@/components/page-structure/table-form";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { UpdateDialog } from "./update-dialog";
import { PayDialog } from "./pay-dialog";
import { Input } from "@/ui/input";

type InvoiceType = {
    _id: string;
    client: string;
    state: string;
    total: number;
    paid: number;
    pending: number;
    discount: number;
    createdAt: Date;
};

const dateFormate = formatDate(new Date(), "yyyy-MM-dd");
const ClientInvoices = () => {
    const [date, setDate] = useState(dateFormate);
    const { data, error, refetch } = useGet<InvoiceType[]>(`/api/clients/invoices?date=${date}`, ["client-invoices"]);

    useEffect(() => {
        refetch();
    }, [date, refetch]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.client-invoices.heading"
            columns={columns}
            data={data || []}
            totalFor="pending"
            filterBy={["client"]}
            navigate={[
                { text: "new-statement", to: "/clients/statements/new" },
                { text: "restore-statement", to: "/clients/statements/restore" },
            ]}
        >
            <div className="mt-4 w-fit sm:mx-4">
                <Input type="date" value={date} name="date" onChange={(event) => setDate(() => event.target.value)} />
            </div>
            <PayDialog />
            <UpdateDialog />
        </TableForm>
    );
};

ClientInvoices.displayName = "ClientInvoices";
export default ClientInvoices;
