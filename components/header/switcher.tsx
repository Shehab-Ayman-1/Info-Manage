"use client";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";

type OrgSwitcherProps = {};

export const OrgSwitcher = ({}: OrgSwitcherProps) => {
    const queryClient = useQueryClient();
    const { theme } = useTheme();

    return (
        <OrganizationSwitcher
            hidePersonal
            organizationProfileMode="modal"
            afterSelectOrganizationUrl={() => {
                queryClient.resetQueries();
                return "";
            }}
            appearance={{
                elements: {
                    organizationSwitcherTrigger: {
                        color: theme === "dark" ? "white !important" : "black",
                        "&:hover": { color: theme === "dark" ? "whitesmoke" : "gray" },
                        "&:focus": { color: theme === "dark" ? "whitesmoke" : "gray" },
                    },
                },
            }}
        />
    );
};

OrgSwitcher.displayName = "OrgSwitcher";
