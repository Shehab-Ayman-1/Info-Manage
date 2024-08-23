import { clerkClient, auth } from "@clerk/nextjs/server";

import { ActiveOrg } from "@/utils/activeOrg";
import { Providers } from "@/providers";

import { Configrator } from "@/components/configrator";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
import "./sass/index.scss";
import Image from "next/image";
import { IsSubscription } from "@/utils/subscription";

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
                    <ActiveOrg orgId={org.id} />
                    <IsSubscription />
                    <Sidebar />
                    <Image src={"/overview.jpeg"} alt="overview" fill className="!fixed -z-10 opacity-5 print:hidden" />
                    {children}
                    <Configrator />
                    <Footer />
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
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

NotSignedIn.displayName = "NotSignedIn";
export default Layout;
