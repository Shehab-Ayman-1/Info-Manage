"use client";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

import { TableForm } from "@/components/page-structure/table-form";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { PayDialog } from "./pay-dialog";
import { Input } from "@/ui/input";

type BillType = {
    _id: string;
    client: string;
    state: string;
    total: string;
    paid: string;
    pending: string;
    discount: string;
    created_At: Date;
};

const dateFormate = formatDate(new Date(), "yyyy-MM-dd");
const ClientBills = () => {
    const [date, setDate] = useState(dateFormate);
    const { data, error, refetch } = useGet<BillType[]>(`/api/clients/bills?date=${date}`, ["client-bills"]);

    useEffect(() => {
        refetch();
    }, [date, refetch]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Client Bills List"
            columns={columns}
            data={data || []}
            filterBy={["client"]}
            totalFor="pending"
            navigate={[{ text: "New Statement", to: "/clients/statements/new" }]}
        >
            <div className="mt-4 w-fit sm:ml-4">
                <Input type="date" value={date} name="date" onChange={(event) => setDate(() => event.target.value)} />
            </div>
            <PayDialog />
        </TableForm>
    );
};

ClientBills.displayName = "ClientBills";
export default ClientBills;
