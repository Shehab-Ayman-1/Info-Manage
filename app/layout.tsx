import { clerkClient, auth } from "@clerk/nextjs/server";
import Image from "next/image";

import { ActiveOrg } from "@/utils/activeOrg";
import { Providers } from "@/providers";

import { Configrator } from "@/components/configrator";
import { Sidebar } from "@/components/sidebar";
import "./sass/index.scss";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Icons } from "@/ui/icons";

export const metadata = {
    title: "Info Manage",
};

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
    const { userId } = auth();
    if (!userId) return <NotSignedIn>{children}</NotSignedIn>;

    const orgs = await clerkClient().users.getOrganizationMembershipList({ userId });
    const org = orgs?.data[0]?.organization;

    if (!org?.id) return <NotSignedIn>{children}</NotSignedIn>;

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-gradient min-h-screen">
                <Providers>
                    <ClerkLoading>
                        <Icons.spinner className="fixed left-1/2 top-1/2 size-16 animate-spin" />
                    </ClerkLoading>

                    <ClerkLoaded>
                        <ActiveOrg orgId={org.id} />
                        <Sidebar />
                        {children}
                        <Image src="/overview.jpeg" alt="overview" fill className="!fixed -z-10 opacity-5" />
                        <Configrator />
                    </ClerkLoaded>
                </Providers>
            </body>
        </html>
    );
};

function NotSignedIn({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-gradient min-h-screen">
                <Providers>
                    <Configrator />
                    {children}
                </Providers>
            </body>
        </html>
    );
}

NotSignedIn.displayName = "NotSignedIn";
export default Layout;
