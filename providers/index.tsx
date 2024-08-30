import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/ui/sonner";
import { DarkTheme } from "./theme";
import { QueryProvider } from "./query";
import { I18nProvider } from "./i18n";

type ProvidersProps = {
    children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <ClerkProvider>
            <DarkTheme attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <QueryProvider>
                    <I18nProvider>
                        <Toaster richColors duration={5000} />
                        {children}
                    </I18nProvider>
                </QueryProvider>
            </DarkTheme>
        </ClerkProvider>
    );
};
