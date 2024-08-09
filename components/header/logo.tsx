"use client";
import Image from "next/image";
import Link from "next/link";

import { useOrganization } from "@clerk/nextjs";
import { Button } from "@/ui/button";

type LogoProps = {};

export const Logo = ({}: LogoProps) => {
    const { organization } = useOrganization();
    if (!organization) return <div></div>;

    return (
        <Button asChild variant="ghost" className="flex-start hover:bg-transparent">
            <Link href="/">
                <Image
                    src={organization.hasImage ? organization.imageUrl : "/logo.png"}
                    alt="logo"
                    width={35}
                    height={35}
                    priority
                    className="rounded-xl"
                />
                <h2 className="text-gradient hidden text-3xl font-extrabold capitalize sm:block print:text-black">
                    {organization.name}
                </h2>
            </Link>
        </Button>
    );
};
Logo.displayName = "Logo";
