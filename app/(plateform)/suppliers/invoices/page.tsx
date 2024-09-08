"use client";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { DeleteDialog } from "./delete-dialog";
import { PayDialog } from "./pay-dialog";
import { Input } from "@/ui/input";

type InvoiceType = {
    _id: string;
    supplier: string;
    state: string;
    total: number;
    paid: number;
    pending: number;
    createdAt: Date;
};

const dateFormate = formatDate(new Date(), "yyyy-MM-dd");
const SupplierInvoices = () => {
    const { mutate, data, error } = useGetByQuery<InvoiceType[]>("/api/suppliers/invoices", ["supplier-invoices"]);
    const [date, setDate] = useState(dateFormate);

    useEffect(() => {
        mutate(`date=${date}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.supplier-invoices.heading"
            columns={columns}
            data={data || []}
            totalFor="pending"
            filterBy={["supplier"]}
            navigate={[
                { text: "new-statement", to: "/suppliers/statements/new" },
                { text: "restore-statement", to: "/suppliers/statements/restore" },
            ]}
        >
            <div className="mt-4 w-fit sm:mx-4">
                <Input type="date" value={date} name="date" onChange={(event) => setDate(() => event.target.value)} />
            </div>
            <DeleteDialog />
            <PayDialog />
        </TableForm>
    );
};

SupplierInvoices.displayName = "SupplierInvoices";
export default SupplierInvoices;
