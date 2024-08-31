import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs";

export default getRequestConfig(async () => {
    const cookieLocale = cookies().get("NEXT_LOCALE")?.value;
    const locale = cookieLocale || "en";

    const dir = path.join("i18n", "messages", locale);
    const files = fs.readdirSync(dir);

    const messages = files.reduce((acc, file) => {
        const filePath = path.join(dir, file);
        const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return { ...acc, ...fileContents };
    }, {});

    return { locale, messages };
});
