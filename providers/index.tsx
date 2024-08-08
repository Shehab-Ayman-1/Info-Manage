import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/ui/sonner";
import { DarkTheme } from "./theme";
import { QueryProvider } from "./query";

type ProvidersProps = {
    children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <ClerkProvider>
            <DarkTheme attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <QueryProvider>
                    <Toaster richColors />
                    {children}
                </QueryProvider>
            </DarkTheme>
        </ClerkProvider>
    );
};
