"use client";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";

import { TableForm } from "@/components/page-structure/table-form";
import { DatePickerWithRange } from "@/components/ui/calender";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";

import { DeleteDialog } from "./delete-dialog";
import { columns } from "./table-columns";
import { PayDialog } from "./pay-dialog";

type InvoiceType = {
    _id: string;
    supplier: string;
    state: string;
    total: number;
    paid: number;
    pending: number;
    createdAt: Date;
};

const SupplierInvoices = () => {
    const { data, isPending, error, mutate } = useGetByQuery<InvoiceType[]>("/api/suppliers/invoices", ["supplier-invoices"]);
    const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: undefined });

    useEffect(() => {
        mutate(`startDate=${date?.from}&endDate=${date?.to}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.supplier-invoices.heading"
            columns={columns}
            data={data || []}
            isPending={isPending}
            totalFor="pending"
            filterBy={["supplier"]}
            navigate={[
                { text: "new-statement", to: "/suppliers/statements/new" },
                { text: "refund-statement", to: "/suppliers/statements/refund" },
            ]}
        >
            <div className="mt-4 w-fit sm:mx-4">
                <DatePickerWithRange date={date} setDate={setDate} />
            </div>

            <DeleteDialog />
            <PayDialog />
        </TableForm>
    );
};

SupplierInvoices.displayName = "SupplierInvoices";
export default SupplierInvoices;
