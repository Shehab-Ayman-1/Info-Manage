import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { clerkClient, auth } from "@clerk/nextjs/server";
import { getLocale } from "next-intl/server";
import Image from "next/image";

import { ActiveOrg } from "@/utils/activeOrg";
import { Providers } from "@/providers";

import { AppLoading } from "@/components/loading/app-loading";
import { Sidebar } from "@/components/sidebar";
import "./sass/index.scss";

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
    const locale = await getLocale();

    return (
        <html suppressHydrationWarning lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <body className="bg-gradient relative min-h-screen w-full overflow-x-hidden">
                <Providers>
                    <ClerkLoading>
                        <div className="fixed left-1/2 -translate-x-1/2">
                            <AppLoading />
                        </div>
                    </ClerkLoading>

                    <ClerkLoaded>
                        <ActiveOrg orgId={org.id} />
                        <Sidebar />

                        {children}

                        <Image src="/images/overview.jpeg" alt="overview" fill className="!fixed -z-10 opacity-5" />
                    </ClerkLoaded>
                </Providers>
            </body>
        </html>
    );
};

function NotSignedIn({ children }: LayoutProps) {
    return (
        <html suppressHydrationWarning lang="en" data-theme-color="orange">
            <body className="bg-gradient min-h-screen">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

NotSignedIn.displayName = "NotSignedIn";
export default Layout;
