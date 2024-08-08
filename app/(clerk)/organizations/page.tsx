"use client";
import { OrganizationList, useOrganizationList } from "@clerk/nextjs";

type OrganizationsListsProps = {};

const OrganizationsLists = ({}: OrganizationsListsProps) => {
    const { setActive } = useOrganizationList();

    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={(org) => {
                setActive?.({ organization: org.id });
                return "";
            }}
        />
    );
};

OrganizationsLists.displayName = "OrganizationsLists";
export default OrganizationsLists;
