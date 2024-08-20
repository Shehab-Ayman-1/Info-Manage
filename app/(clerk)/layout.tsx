type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return <div className="flex-center mx-auto mb-16 min-h-screen w-full p-2 sm:p-4">{children}</div>;
};

export default Layout;
