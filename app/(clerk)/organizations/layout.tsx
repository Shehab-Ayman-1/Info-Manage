import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "./navbar";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
    const { userId, orgRole, redirectToSignIn } = auth();

    if (!userId) return redirectToSignIn({ returnBackUrl: "/sign-in" });
    if (orgRole !== "org:admin") return redirect("/");

    return (
        <div className="flex-center w-full flex-col self-start">
            <Navbar />
            {children}
        </div>
    );
};

Layout.displayName = "Layout";
export default Layout;
