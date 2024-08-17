"use client";
import { useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";

type ActiveOrgProps = {
    orgId: string;
};

export const ActiveOrg = ({ orgId }: ActiveOrgProps) => {
    const { setActive } = useOrganizationList();

    // Redirect To The User Organization
    useEffect(() => {
        if (!orgId) return;
        setActive?.({ organization: orgId });
    }, [orgId, setActive]);

    return null;
};
