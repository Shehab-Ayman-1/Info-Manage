type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return <div className="flex-center min-h-screen">{children}</div>;
};

export default Layout;
