"use client";
import { CardLoading } from "@/components/loading/card";
import { useGet } from "@/hooks/api/useGet";
import { Card } from "@/ui/card";
import { Fragment } from "react";

type LockerProps = {
    locker: number;
    market: number;
    store: number;
};

const Locker = () => {
    const { data, isPending, error } = useGet<LockerProps>("/api/show/cashes", ["cashes"]);

    if (isPending) return <CardLoading />;
    if (error) return <h3>{error?.message}</h3>;

    const [{ locker, market, store }] = data;

    return (
        <Fragment>
            <Card className="flex-around bg-primary p-2 shadow-md sm:p-6">
                <h1 className="text-2xl font-extrabold text-white dark:text-black">Locker Cash</h1>
                <div className="text-2xl font-extrabold text-white dark:text-black">$ {locker.toLocaleString()}</div>
            </Card>

            <Card className="flex-around my-6 bg-primary p-2 shadow-md sm:p-6">
                <h1 className="text-2xl font-extrabold text-white dark:text-black">Market Cash</h1>
                <div className="text-2xl font-extrabold text-white dark:text-black">$ {market.toLocaleString()}</div>
            </Card>

            <Card className="flex-around bg-primary p-2 shadow-md sm:p-6">
                <h1 className="text-2xl font-extrabold text-white dark:text-black">Store Cash</h1>
                <div className="text-2xl font-extrabold text-white dark:text-black">$ {store.toLocaleString()}</div>
            </Card>
        </Fragment>
    );
};

Locker.displayName = "Locker";
export default Locker;
