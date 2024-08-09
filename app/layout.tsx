import { clerkClient, auth } from "@clerk/nextjs/server";

import { ActiveOrg } from "@/utils/activeOrg";
import { Providers } from "@/providers";

import { Configrator } from "@/components/configrator";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./sass/index.scss";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
    const { userId } = auth();
    if (!userId)
        return (
            <html>
                <body>
                    <Providers>{children}</Providers>
                </body>
            </html>
        );

    const orgs = await clerkClient().users.getOrganizationMembershipList({ userId });
    const orgId = orgs?.data[0]?.organization.id;

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-gradient min-h-screen">
                <Providers>
                    <ActiveOrg orgId={orgId} />
                    <Header />
                    <Sidebar />
                    <Configrator />
                    <div className="m-auto mb-16 min-h-[calc(100vh-200px)] max-w-screen-xl p-2 sm:p-4">{children}</div>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
};

export default Layout;
