import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) redirect("/");

    return children;
};

Layout.displayName = "Layout";
export default Layout;
