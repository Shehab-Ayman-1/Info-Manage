"use client";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/ui/button";

type OverviewProps = {};

const Overview = ({}: OverviewProps) => {
    const { organization } = useOrganization();
    if (!organization) return;

    return (
        <div className="flex-center flex-col p-6">
            <Image src="/logo.png" alt="logo" width={300} height={300} />

            <h1 className="text-6xl font-extrabold text-primary">{organization.name}</h1>

            <p className="text-center text-slate-500">
                A flexible and powerful platform for managing any data shops,
                <br /> stores and monitor statistics with ease and efficiency
            </p>

            <div className="flex-center flex-col sm:flex-row">
                <Button asChild size="lg" className="h-auto bg-transparent px-12 py-4 text-center text-lg" variant="outline">
                    <Link href="/statements/clients">
                        Client <br /> Statement
                    </Link>
                </Button>
                <Button asChild size="lg" className="h-auto px-12 py-4 text-center text-lg">
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
