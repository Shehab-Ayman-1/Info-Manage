import { SubscriptionCard } from "./card";

const Subscription = () => {
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
        "Total Cashes Of Market, Store, And Debts",
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
        <div className="container mx-auto p-4">
            <h1 className="mb-8 text-4xl font-bold text-primary">Subscription Plans</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <SubscriptionCard heading="Basic" cost={500} features={basics} />

                <SubscriptionCard heading="Premium" cost={800} features={premium} />

                <SubscriptionCard heading="Enterprise" cost={1000} features={enterprise} />
            </div>
        </div>
    );
};

Subscription.displayName = "Subscription";
export default Subscription;
