"use client";
import { useSubscription } from "@/hooks/useSubscription";
import { useGet } from "@/hooks/api/useGet";

import { CashesLoading } from "@/components/loading/cashes";
import { CashCard } from "./card";

type CashesProps = {
    locker: {
        cash: number;
        visa: number;
    };
    market: {
        purchasePrice: number;
        sellingPrice: number;
    };
    store: {
        purchasePrice: number;
        sellingPrice: number;
    };
    debts: {
        clients: number;
        suppliers: number;
    };
};

const Cashes = () => {
    const { data, isPending, error } = useGet<CashesProps>("/api/show/cashes", ["cashes"]);
    const { isSubscribe } = useSubscription(["premium"]);

    if (isPending) return <CashesLoading />;
    if (error) return <h3>{error?.message}</h3>;

    console.log(data);

    const [{ locker, market, store, debts }] = data;

    return (
        <div className="flex-between mt-4 !flex-wrap">
            <CashCard
                heading="Details Of Locker"
                isSubscribe
                items={[
                    { title: "Total By Cash", value: locker.cash },
                    { title: "Total By Visa", value: locker.visa },
                ]}
            />

            <CashCard
                heading="Details Of Market"
                isSubscribe={isSubscribe}
                items={[
                    { title: "Total By Purchase Price", value: market.purchasePrice },
                    { title: "Total By Selling Price", value: market.sellingPrice },
                ]}
            />

            <CashCard
                heading="Details Of Store"
                isSubscribe={isSubscribe}
                items={[
                    { title: "Total By Purchase Price", value: store.purchasePrice },
                    { title: "Total By Selling Price", value: store.sellingPrice },
                ]}
            />

            <CashCard
                heading="Details Of Debts"
                isSubscribe={isSubscribe}
                items={[
                    { title: "Client Debts", value: debts.clients },
                    { title: "Supplier Debts", value: debts.suppliers },
                ]}
            />
        </div>
    );
};

Cashes.displayName = "Cashes";
export default Cashes;
