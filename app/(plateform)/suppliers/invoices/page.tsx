"use client";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";

import { TableForm } from "@/components/page-structure/table-form";
import { DatePickerWithRange } from "@/components/ui/calender";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";

import { DeleteItemByRequest } from "@/widgets/public/delete-item-by-request";
import { PaymentDialog } from "@/widgets/public/payment-dialog";
import { columns } from "./table-columns";

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
    const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 1) });

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

            <DeleteItemByRequest
                dialogType="supplier-invoices-delete-model"
                apiUrl="/api/suppliers/invoices"
                queryKeys={["supplier-invoices", "products"]}
                requestKeys={{ senderId: "invoiceId", dataId: "invoiceId" }}
            />
            <PaymentDialog
                dialogType="supplier-invoices-payment-model"
                apiUrl="/api/profile/supplier"
                dataId="invoiceId"
                queryKeys={["supplier-invoices"]}
            />
        </TableForm>
    );
};

SupplierInvoices.displayName = "SupplierInvoices";
export default SupplierInvoices;
