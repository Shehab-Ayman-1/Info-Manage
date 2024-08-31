"use client";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { basics, premium, enterprise } from "@/constants";
import { SubscriptionCard } from "./card";

const Subscription = () => {
    const text = useTranslations("subscriptions");

    return (
        <Fragment>
            <h1 className="mb-8 text-2xl font-bold text-primary sm:text-4xl">{text("heading")}</h1>
            <div className="grid grow grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                <SubscriptionCard heading="basic" features={basics} costs={{ month: 200, year: 2200, life: 20000 }} />
                <SubscriptionCard heading="premium" features={premium} costs={{ month: 100, halfYear: 600, year: 1100 }} />
                <SubscriptionCard heading="enterprise" features={enterprise} costs={{ month: 100, halfYear: 600, year: 1100 }} />
            </div>
        </Fragment>
    );
};

Subscription.displayName = "Subscription";
export default Subscription;
