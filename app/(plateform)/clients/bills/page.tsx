"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { formatDate } from "date-fns";

import { TableForm } from "@/components/page-structure/table-form";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { PayDialog } from "./pay-dialog";
import { Input } from "@/ui/input";
import { UpdateDialog } from "./update-dialog";

type BillType = {
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
const ClientBills = () => {
    const [date, setDate] = useState(dateFormate);
    const { data, error, refetch } = useGet<BillType[]>(`/api/clients/bills?date=${date}`, ["client-bills"]);
    const text = useTranslations("pages");

    useEffect(() => {
        refetch();
    }, [date, refetch]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle={text("client-bills.heading")}
            columns={columns}
            data={data || []}
            totalFor="pending"
            filterBy={["client"]}
            navigate={[{ text: "new-statement", to: "/clients/statements/new" }]}
        >
            <div className="mt-4 w-fit sm:mx-4">
                <Input type="date" value={date} name="date" onChange={(event) => setDate(() => event.target.value)} />
            </div>
            <PayDialog />
            <UpdateDialog />
        </TableForm>
    );
};

ClientBills.displayName = "ClientBills";
export default ClientBills;
