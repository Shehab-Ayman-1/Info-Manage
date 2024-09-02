"use client";
import { useSubscription } from "@/hooks/useSubscription";
import { useGet } from "@/hooks/api/useGet";
import { useTranslations } from "next-intl";

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
    const { data, isPending, error } = useGet<CashesProps>("/api/finances", ["cashes"]);
    const { isAdditionalSubscribe } = useSubscription(["premium"]);
    const text = useTranslations();

    if (isPending) return <CashesLoading />;
    if (error) return <h3>{error?.message}</h3>;
    if (!data) return;

    const { locker, market, store, debts } = data;

    return (
        <div className="flex-between mt-4 !flex-wrap">
            <CashCard
                heading={text("pages.cashes.locker.heading")}
                isAdditionalSubscribe
                items={[
                    { title: text("pages.cashes.locker.cash"), value: locker.cash },
                    { title: text("pages.cashes.locker.visa"), value: locker.visa },
                ]}
            />

            <CashCard
                heading={text("pages.cashes.market.heading")}
                isAdditionalSubscribe={isAdditionalSubscribe}
                items={[
                    { title: text("pages.cashes.market.purchases"), value: market.purchasePrice },
                    { title: text("pages.cashes.market.sales"), value: market.sellingPrice },
                ]}
            />

            <CashCard
                heading={text("pages.cashes.store.heading")}
                isAdditionalSubscribe={isAdditionalSubscribe}
                items={[
                    { title: text("pages.cashes.store.purchases"), value: store.purchasePrice },
                    { title: text("pages.cashes.store.sales"), value: store.sellingPrice },
                ]}
            />

            <CashCard
                heading={text("pages.cashes.debts.heading")}
                isAdditionalSubscribe={isAdditionalSubscribe}
                items={[
                    { title: text("pages.cashes.debts.clients"), value: debts.clients },
                    { title: text("pages.cashes.debts.suppliers"), value: debts.suppliers },
                ]}
            />
        </div>
    );
};

Cashes.displayName = "Cashes";
export default Cashes;
