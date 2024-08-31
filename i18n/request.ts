import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
    const cookieLocale = cookies().get("NEXT_LOCALE")?.value;

    const locale = cookieLocale || "en";

    const files = ["buttons", "dialogs", "footer", "header", "overview", "pages", "public", "subscriptions", "table"];

    const messages = files.reduce(async (accumelator, file) => {
        const fileContents = (await import(`@/i18n/messages/${locale}/${file}.json`)).default;
        const previousValues = await accumelator;
        return { ...previousValues, ...fileContents };
    }, {});

    return {
        locale,
        messages,
    };
});
