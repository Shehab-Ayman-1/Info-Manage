"use client";
import { useOrganization } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/ui/button";

export const Logo = () => {
    const { organization } = useOrganization();
    const text = useTranslations("header");

    return (
        <Button asChild variant="ghost" className="flex-start hover:bg-transparent">
            <Link href="/">
                <Image
                    src={organization?.hasImage ? organization.imageUrl : "/logo.png"}
                    alt="logo"
                    width={35}
                    height={35}
                    className="rounded-xl"
                />
                <h2 className="text-gradient hidden text-3xl font-extrabold capitalize sm:block">
                    {organization?.name || text("brand")}
                </h2>
            </Link>
        </Button>
    );
};
Logo.displayName = "Logo";
