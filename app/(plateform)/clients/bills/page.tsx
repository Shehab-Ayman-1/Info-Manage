"use client";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

import { TableForm } from "@/components/page-structure/table-form";
import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";

import { DeleteDialog } from "./delete-dialog";
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
    const { mutate, data, error } = useGetByQuery<BillType[]>("/api/clients/bills");
    const [date, setDate] = useState(dateFormate);

    useEffect(() => {
        mutate(`date=${date}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Client Bills List"
            columns={columns}
            data={data || []}
            filterBy={["client"]}
            totalFor="pending"
            navigate={[{ text: "New Statement", to: "/clients/statement" }]}
        >
            <div className="mt-4 w-fit sm:ml-4">
                <Input type="date" value={date} name="date" onChange={(event) => setDate(() => event.target.value)} />
            </div>
            <DeleteDialog />
            <PayDialog />
        </TableForm>
    );
};

ClientBills.displayName = "ClientBills";
export default ClientBills;
