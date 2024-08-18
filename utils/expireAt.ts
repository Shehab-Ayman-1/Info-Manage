import { auth, clerkClient } from "@clerk/nextjs/server";

export const getExpireAt = async () => {
    const { userId, orgId, orgSlug } = auth();
    if (!userId || !orgId) return;

    const organization = await clerkClient().organizations.getOrganization({ organizationId: orgId, slug: orgSlug });
    if (!organization) return;

    const expireAt = new Date();
    const expiresAfter = +(organization.publicMetadata?.removeUnnecessaryData as string).split(" ")[0];

    expireAt.setMonth(expireAt.getMonth() + expiresAfter);
    return expireAt;
};
