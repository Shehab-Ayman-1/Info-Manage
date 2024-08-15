"use client";
import { CashesLoading } from "@/components/loading/cashes";
import { useGet } from "@/hooks/api/useGet";

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

    if (isPending) return <CashesLoading />;
    if (error) return <h3>{error?.message}</h3>;

    const [{ locker, market, store, debts }] = data;

    return (
        <div className="flex-between mt-4 !flex-wrap">
            <div className="w-full max-w-sm rounded-md bg-primary-50 p-4 dark:bg-slate-800">
                <h1 className="text-xl font-bold text-primary">Details Of Locker</h1>

                <div className="flex-between my-4">
                    <h3 className="">Total By Cash: </h3>
                    <h3 className="">${locker.cash}</h3>
                </div>

                <div className="flex-between">
                    <h3 className="">Total By Visa: </h3>
                    <h3 className="">${locker.visa}</h3>
                </div>
            </div>

            <div className="w-full max-w-sm rounded-md bg-primary-50 p-4 dark:bg-slate-800">
                <h1 className="text-xl font-bold text-primary">Details Of Market</h1>

                <div className="flex-between my-4">
                    <h3 className="">Total By Purchase Price: </h3>
                    <h3 className="">${market.purchasePrice}</h3>
                </div>

                <div className="flex-between">
                    <h3 className="">Total By Salling Price: </h3>
                    <h3 className="">${market.sellingPrice}</h3>
                </div>
            </div>

            <div className="w-full max-w-sm rounded-md bg-primary-50 p-4 dark:bg-slate-800">
                <h1 className="text-xl font-bold text-primary">Details Of Store</h1>

                <div className="flex-between my-4">
                    <h3 className="">Total By Purchase Price: </h3>
                    <h3 className="">${store.purchasePrice}</h3>
                </div>

                <div className="flex-between">
                    <h3 className="">Total By Salling Price: </h3>
                    <h3 className="">${store.sellingPrice}</h3>
                </div>
            </div>

            <div className="w-full max-w-sm rounded-md bg-primary-50 p-4 dark:bg-slate-800">
                <h1 className="text-xl font-bold text-primary">Details Of Debts</h1>

                <div className="flex-between my-4">
                    <h3 className="">Client debts: </h3>
                    <h3 className="">${debts.clients}</h3>
                </div>

                <div className="flex-between">
                    <h3 className="">Supplier Debts: </h3>
                    <h3 className="">${debts.suppliers}</h3>
                </div>
            </div>
        </div>
    );
};

Cashes.displayName = "Cashes";
export default Cashes;
