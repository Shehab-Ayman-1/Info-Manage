import { auth, clerkClient } from "@clerk/nextjs/server";
import { SubscriptionCard } from "./card";

const Subscription = async () => {
    const { orgId, orgSlug } = auth();
    const organization = orgSlug && (await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug }));
    const subscription = (organization as any)?.publicMetadata?.subscription;

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
        <div className="">
            <h1 className="mb-8 text-2xl font-bold text-primary sm:text-4xl">Subscription Plans</h1>
            <div className="flex flex-wrap items-start justify-center gap-4 sm:justify-between">
                <SubscriptionCard
                    heading="Basic"
                    subscription={subscription}
                    features={basics}
                    costs={{ month: 500, year: 5800, life: 45000 }}
                />
                <SubscriptionCard
                    heading="Premium"
                    subscription={subscription}
                    features={premium}
                    costs={{ month: 700, year: 8000, life: 55000 }}
                />
                <SubscriptionCard
                    heading="Enterprise"
                    subscription={subscription}
                    features={enterprise}
                    costs={{ month: 900, year: 10000, life: 65000 }}
                />
            </div>
        </div>
    );
};

Subscription.displayName = "Subscription";
export default Subscription;
