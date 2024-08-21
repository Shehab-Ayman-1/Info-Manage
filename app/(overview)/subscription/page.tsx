import { Fragment } from "react";
import { SubscriptionCard } from "./card";

const Subscription = async () => {
    const basics = [
        "Market Products",
        "Store Products",
        "Total Locker Cashes",
        "Client Bills",
        "Supplier Bills",
        "Client Statements",
        "Supplier Statements",
        "Locker Withdraw & Deposit",
    ];

    const premium = [
        "Total Market, Store, And Debts Cashes",
        "Locker Transactions",
        "Clients Details",
        "Suppliers Details",
        "Today Purchase Receipt",
        "Today Sales Receipt",
    ];

    const enterprise = [
        "Product Movement",
        "Sales Statistics",
        "Profits Statistics",
        "Insufficient Products",
        "Least Selling Products",
        "Best Selling Of The Month",
        "Best Selling Of The Year",
    ];

    return (
        <Fragment>
            <h1 className="mb-8 text-2xl font-bold text-primary sm:text-4xl">Subscription Plans</h1>
            <div className="grid grow grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                <SubscriptionCard heading="Basic" features={basics} costs={{ month: 500, year: 5000, life: 25000 }} />
                <SubscriptionCard heading="Premium" features={premium} costs={{ month: 200, year: 2000 }} />
                <SubscriptionCard heading="Enterprise" features={enterprise} costs={{ month: 200, year: 2000 }} />
            </div>
        </Fragment>
    );
};

Subscription.displayName = "Subscription";
export default Subscription;
