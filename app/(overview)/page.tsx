"use client";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/ui/button";

type OverviewProps = {};

const Overview = ({}: OverviewProps) => {
    const { organization } = useOrganization();

    return (
        <div className="flex-center flex-col p-6">
            <Image
                src={organization?.hasImage ? organization.imageUrl : "/logo.png"}
                alt="logo"
                width={300}
                height={300}
                className="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]"
            />

            <h1 className="text-gradient text-4xl font-extrabold text-primary sm:text-6xl">
                {organization?.name || "Info Manage"}
            </h1>

            <p className="text-center text-xs text-slate-500 sm:text-base">
                A flexible and powerful platform for managing any data shops,
                <br /> stores and monitor statistics with ease and efficiency
            </p>

            <div className="flex-center flex-wrap">
                <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-auto bg-transparent px-6 py-2 text-center text-xs sm:px-12 sm:py-4 sm:text-lg"
                >
                    <Link href="/statements/clients">
                        Client <br /> Statement
                    </Link>
                </Button>
                <Button asChild size="lg" className="h-auto px-6 py-2 text-center text-xs sm:px-12 sm:py-4 sm:text-lg">
                    <Link href="/statements/suppliers">
                        Supplier <br /> Statement
                    </Link>
                </Button>
            </div>
        </div>
    );
};

Overview.displayName = "Overview";
export default Overview;
