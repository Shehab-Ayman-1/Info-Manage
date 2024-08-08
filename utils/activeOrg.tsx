"use client";
import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";
import { toast } from "sonner";

type ActiveOrgProps = {
    orgId: string;
};

export const ActiveOrg = ({ orgId }: ActiveOrgProps) => {
    const { setActive } = useOrganizationList();
    const { signOut } = useAuth();

    // If Anyone Visit And Doen't Have Any Organization Yet
    useEffect(() => {
        if (orgId) return;

        toast.info("You Are Not Belong To Any Organization Yet, You Will Redirect To The Public Organization !!!!");
        setTimeout(() => signOut({ redirectUrl: "/sign-in" }), 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Redirect To The User Organization
    useEffect(() => {
        if (!orgId) return;
        setActive?.({ organization: orgId });
    }, [orgId, setActive]);

    return null;
};
