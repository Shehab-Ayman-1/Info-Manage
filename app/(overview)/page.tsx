"use client";
import { useOrganization, ClerkLoaded } from "@clerk/nextjs";
import { AlertTriangleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/ui/button";
import { Alert } from "@/ui/alert";

type OverviewProps = {};

const Overview = ({}: OverviewProps) => {
    const text = useTranslations("profile");
    const { organization } = useOrganization();
    const { isSubscribe } = useSubscription();

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

            <Image
                src={organization?.hasImage ? organization.imageUrl : "/logo.png"}
                alt="logo"
                width={300}
                height={300}
                className="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]"
            />

            <h1 className="text-gradient text-4xl font-extrabold text-primary sm:text-6xl">
                {organization?.name || "Info Manage"}
                {text("title")}
            </h1>

            <p className="text-center text-xs text-slate-500 sm:text-base">
                A flexible and powerful platform for managing any data shops,
                <br /> stores and monitor statistics with ease and efficiency
            </p>

            {!!organization && (
                <div className="flex-center flex-wrap">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="h-auto bg-transparent px-6 py-2 text-center text-xs sm:px-12 sm:py-4 sm:text-lg"
                    >
                        <Link href="/clients/statements/new">
                            Client <br /> Statement
                        </Link>
                    </Button>
                    <Button asChild size="lg" className="h-auto px-6 py-2 text-center text-xs sm:px-12 sm:py-4 sm:text-lg">
                        <Link href="/suppliers/statements/new">
                            Supplier <br /> Statement
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

Overview.displayName = "Overview";
export default Overview;
