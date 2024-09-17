"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Fragment } from "react";

import { basics, premium, enterprise, animate } from "@/constants";
import { SubscriptionCard } from "./card";

const Subscription = () => {
    const text = useTranslations("subscriptions");

    return (
        <Fragment>
            <motion.h1 {...animate("opacity")} className="mb-8 text-2xl font-bold text-primary sm:text-4xl">
                {text("heading")}
            </motion.h1>

            <div className="grid grow grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                <SubscriptionCard
                    heading="basic"
                    features={basics}
                    costs={{ month: 200, year: 2200, life: 25000 }}
                    className="-mb-6 mt-6"
                />
                <SubscriptionCard
                    heading="enterprise"
                    features={enterprise}
                    costs={{ month: 100, halfYear: 600, year: 1100 }}
                    className="shadow-xl !shadow-slate-600"
                />
                <SubscriptionCard
                    heading="premium"
                    features={premium}
                    costs={{ month: 100, halfYear: 600, year: 1100 }}
                    className="-mb-6 mt-6"
                />
            </div>
        </Fragment>
    );
};

Subscription.displayName = "Subscription";
export default Subscription;
