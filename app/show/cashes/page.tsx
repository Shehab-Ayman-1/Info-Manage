"use client";
import { Fragment } from "react";

import { useSubscription } from "@/hooks/useSubscription";
import { useGet } from "@/hooks/api/useGet";

import { CashesLoading } from "@/components/loading/cashes";
import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";

type CashesProps = {
    locker: number;
    market: number;
    store: number;
};

const Cashes = () => {
    const { data, isPending, error } = useGet<CashesProps>("/api/show/cashes", ["cashes"]);
    const { isSubscribe } = useSubscription(["premium"]);

    if (isPending) return <CashesLoading />;
    if (error) return <h3>{error?.message}</h3>;

    const [{ locker, market, store }] = data;

    return (
        <Fragment>
            <Card className="flex-between mx-auto mt-6 max-w-4xl bg-primary p-2 shadow-md sm:p-6">
                <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">Locker Cash</h1>
                <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">$ {locker.toLocaleString()}</h1>
            </Card>

            <Card className="flex-between mx-auto my-6 max-w-4xl bg-primary p-2 shadow-md sm:p-6">
                <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">Market Cash</h1>
                <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">
                    {isSubscribe ? `$${market.toLocaleString()}` : "????"}
                    {!isSubscribe && (
                        <Badge variant="destructive" className="ml-4">
                            Premium
                        </Badge>
                    )}
                </h1>
            </Card>

            <Card className="flex-between mx-auto my-6 max-w-4xl bg-primary p-2 shadow-md sm:p-6">
                <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">Store Cash</h1>
                <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">
                    {isSubscribe ? `$${store.toLocaleString()}` : "????"}
                    {!isSubscribe && (
                        <Badge variant="destructive" className="ml-4">
                            Premium
                        </Badge>
                    )}
                </h1>
            </Card>

            <Card className="flex-between mx-auto max-w-4xl bg-primary p-2 shadow-md sm:p-6">
                <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">Market & Store Cash</h1>
                <h1 className="text-xl font-extrabold text-white dark:text-black sm:text-2xl">
                    {isSubscribe ? `$${(market + store).toLocaleString()}` : "????"}
                    {!isSubscribe && (
                        <Badge variant="destructive" className="ml-4">
                            Premium
                        </Badge>
                    )}
                </h1>
            </Card>
        </Fragment>
    );
};

Cashes.displayName = "Cashes";
export default Cashes;
