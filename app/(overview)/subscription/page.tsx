import { Fragment } from "react";

import { basics, premium, enterprise } from "@/constants";
import { SubscriptionCard } from "./card";

const Subscription = async () => {
    return (
        <Fragment>
            <h1 className="mb-8 text-2xl font-bold text-primary sm:text-4xl">Subscription Plans</h1>
            <div className="grid grow grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                <SubscriptionCard heading="Basic" features={basics} costs={{ month: 200, year: 2200, life: 10000 }} />
                <SubscriptionCard heading="Premium" features={premium} costs={{ month: 100, halfYear: 600, year: 1100 }} />
                <SubscriptionCard heading="Enterprise" features={enterprise} costs={{ month: 100, halfYear: 600, year: 1100 }} />
            </div>
        </Fragment>
    );
};

Subscription.displayName = "Subscription";
export default Subscription;
