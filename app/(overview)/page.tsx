"use client";
import { useOrganization, ClerkLoaded } from "@clerk/nextjs";
import { AlertTriangleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useKey } from "react-use";
import Image from "next/image";
import Link from "next/link";

import { useSubscription } from "@/hooks/useSubscription";
import { useModel } from "@/hooks/useModel";

import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/ui/button";
import { Alert } from "@/ui/alert";
import { animate } from "@/constants";

type OverviewProps = {};

const Overview = ({}: OverviewProps) => {
    const text = useTranslations();
    const { onOpen } = useModel();
    const { organization } = useOrganization();
    const { isSubscribe } = useSubscription();

    const onOpenQuickClientStatement = () => onOpen("quick-client-statement-model");
    useKey((event) => event.ctrlKey && event.key.toLowerCase() === "m", onOpenQuickClientStatement);
    return (
        <div className="flex-center flex-col">
            <ClerkLoaded>
                {!isSubscribe && (
                    <Alert variant="warning" className="text-xl">
                        <AlertTriangleIcon className="mt-1" />
                        <span>Your Subscription Has Been Suspended, Please Contact Our Customer Service.</span>
                    </Alert>
                )}
            </ClerkLoaded>

            <motion.div {...animate("opacity")} className="relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]">
                <Image
                    src={organization?.hasImage ? organization.imageUrl : "/images/logo.png"}
                    className="h-auto w-auto"
                    alt="logo"
                    priority
                    fill
                />
            </motion.div>

            <motion.h1 {...animate("opacity")} className="text-gradient text-4xl font-extrabold text-primary sm:text-6xl">
                {organization?.name || text("header.brand")}
            </motion.h1>

            <motion.p {...animate("opacity")} className="text-center text-xs text-slate-500 sm:text-base">
                {text.rich("overview.description", { br: () => <br /> })}
            </motion.p>

            {!!organization && (
                <motion.div {...animate("opacity")} className="flex-center flex-wrap">
                    <Tooltip content="CTRL + M">
                        <Button
                            type="button"
                            size="lg"
                            onClick={onOpenQuickClientStatement}
                            className="h-auto px-6 py-2 text-center text-xs sm:px-12 sm:py-4 sm:text-lg"
                        >
                            {text.rich("overview.client-statement", { br: () => <br /> })}
                        </Button>
                    </Tooltip>

                    <Button
                        asChild
                        type="button"
                        variant="outline"
                        size="lg"
                        className="h-auto px-6 py-2 text-center text-xs sm:px-12 sm:py-4 sm:text-lg"
                    >
                        <Link href="/suppliers/statements/new">
                            {text.rich("overview.supplier-statement", { br: () => <br /> })}
                        </Link>
                    </Button>
                </motion.div>
            )}
        </div>
    );
};

Overview.displayName = "Overview";
export default Overview;
