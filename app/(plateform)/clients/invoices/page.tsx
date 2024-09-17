"use client";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";

import { TableForm } from "@/components/page-structure/table-form";
import { DatePickerWithRange } from "@/components/ui/calender";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

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

const ClientInvoices = () => {
    const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 1) });
    const { data, isPending, error, refetch } = useGet<InvoiceType[]>(
        `/api/clients/invoices?startDate=${date?.from}&endDate=${date?.to}`,
        ["client-invoices"],
    );

    useEffect(() => {
        if (!date) return;
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.client-invoices.heading"
            columns={columns}
            data={data || []}
            isPending={isPending}
            totalFor="pending"
            filterBy={["client"]}
            navigate={[
                { text: "new-statement", to: "/clients/statements/new" },
                { text: "refund-statement", to: "/clients/statements/refund" },
            ]}
        >
            <div className="mt-4 w-fit sm:mx-4">
                <DatePickerWithRange date={date} setDate={setDate} />
            </div>
        </TableForm>
    );
};

ClientInvoices.displayName = "ClientInvoices";
export default ClientInvoices;
