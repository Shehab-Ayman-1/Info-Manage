import { Fragment } from "react";
import { Header } from "@/components/header";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <Fragment>
            <div className="sm:p-4">
                <Header />
            </div>
            <div className="mx-auto mb-16 min-h-[calc(100vh-200px)] max-w-screen-xl p-2 sm:p-4">{children}</div>
        </Fragment>
    );
};

Layout.displayName = "Layout";
export default Layout;
