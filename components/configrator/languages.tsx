"use client";
import { useEffect, useState } from "react";

import { SelectBox } from "@/components/select";
import { languages } from "@/constants";

export const Languages = () => {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
        if (!language) return;
        localStorage.setItem("language", language);
    }, [language]);

    return (
        <div className="my-6">
            <h1 className="text-2xl font-bold text-primary">Change Language</h1>
            <div className="flex-between">
                <SelectBox
                    label="Language"
                    name="language"
                    className="w-full"
                    items={languages}
                    onChange={(value) => setLanguage(value)}
                />
            </div>
        </div>
    );
};

Languages.displayName = "Languages";
