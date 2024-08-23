"use client";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

import { useGetByQuery } from "@/hooks/api/useGetByQuery";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { DeleteDialog } from "./delete-dialog";
import { PayDialog } from "./pay-dialog";
import { Input } from "@/ui/input";

type BillType = {
    _id: string;
    supplier: string;
    state: string;
    total: string;
    paid: string;
    pending: string;
    created_At: Date;
};

const dateFormate = formatDate(new Date(), "yyyy-MM-dd");
const SupplierBills = () => {
    const { mutate, data, error } = useGetByQuery<BillType[]>("/api/suppliers/bills");
    const [date, setDate] = useState(dateFormate);

    useEffect(() => {
        mutate(`date=${date}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Supplier Bills List"
            columns={columns}
            data={data || []}
            filterBy={["supplier"]}
            totalFor="pending"
            navigate={[{ text: "New Statement", to: "/suppliers/statement" }]}
        >
            <div className="mt-4 w-fit sm:ml-4">
                <Input type="date" value={date} name="date" onChange={(event) => setDate(() => event.target.value)} />
            </div>
            <DeleteDialog />
            <PayDialog />
        </TableForm>
    );
};

SupplierBills.displayName = "SupplierBills";
export default SupplierBills;
