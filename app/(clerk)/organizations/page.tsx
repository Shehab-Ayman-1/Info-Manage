"use client";
import { OrganizationList, useOrganizationList } from "@clerk/nextjs";
import { useLists } from "@/hooks/data/useLists";

type OrganizationsListsProps = {};

const OrganizationsLists = ({}: OrganizationsListsProps) => {
    const { setActive } = useOrganizationList();
    const { onReset } = useLists();

    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={(org) => {
                setActive?.({ organization: org.id });
                onReset(["categories", "companies", "products", "clients", "suppliers"]);
                return "";
            }}
        />
    );
};

OrganizationsLists.displayName = "OrganizationsLists";
export default OrganizationsLists;
