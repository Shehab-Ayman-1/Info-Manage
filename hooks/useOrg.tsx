"use client";
import { useAuth } from "@clerk/nextjs";

export const useOrg = () => {
    const { userId, orgId, orgSlug, orgRole } = useAuth();
    return { userId, orgId, orgSlug, isAdmin: orgRole === "org:admin" };
};
