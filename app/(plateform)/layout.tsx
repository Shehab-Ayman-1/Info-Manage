import { SubscribeProvider } from "@/providers/subscribe";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <SubscribeProvider>
            <div className="sm:p-4">
                <Header />
            </div>

            <div className="m-auto mb-16 min-h-[calc(100vh-230px)] max-w-screen-xl p-2 sm:p-4">{children}</div>

            <Footer />
        </SubscribeProvider>
    );
};

Layout.displayName = "Layout";
export default Layout;
