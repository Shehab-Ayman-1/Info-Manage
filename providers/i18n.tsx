import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type I18nProviderProps = {
    children: React.ReactNode;
};

export const I18nProvider = async ({ children }: I18nProviderProps) => {
    const messages = await getMessages();

    return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
};
