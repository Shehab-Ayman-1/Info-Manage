import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "./navbar";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
    const { userId, redirectToSignIn } = auth();
    if (!userId) return redirectToSignIn({ returnBackUrl: "/sign-in" });

    const { emailAddresses } = await clerkClient().users.getUser(userId);
    if (emailAddresses?.[0]?.emailAddress !== process.env.NEXT_PUBLIC_EMAIL) return redirect("/");

    return (
        <div className="flex-center w-full flex-col self-start">
            <Navbar />
            {children}
        </div>
    );
};

Layout.displayName = "Layout";
export default Layout;
