import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.

    // Read the locale from the NEXT_LOCALE cookie
    const cookieLocale = cookies().get("NEXT_LOCALE")?.value;
    const locale = cookieLocale || "en";

    const messages = (await import(`../messages/${locale}.json`)).default;
    return { locale, messages };
});
