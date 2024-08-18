"use client";
import { useOrganization } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";

import { CardForm } from "@/components/page-structure/CardForm";
import { DataTable } from "@/components/table";

import { useModel } from "@/hooks/useModel";
import { UpdateDialog } from "./update-dialog";
import { DeleteDialog } from "./delete-dialog";
import { InviteDialog } from "./invite-dialog";

import { columns } from "./table-columns";
import { Button } from "@/ui/button";

type TData = {
    user: {
        userId?: string;
        image: string;
        fullName: string;
        email: string;
    };
};

const Members = () => {
    const [data, setData] = useState<TData[]>([]);
    const { organization } = useOrganization();
    const { onOpen } = useModel();

    useEffect(() => {
        if (data.length) return;
        (async () => {
            const members = await organization?.getMemberships();
            if (!members) return;

            const getData = members.data.map((member) => {
                return {
                    userId: member.publicUserData.userId,
                    role: member.role.slice(4),
                    createdAt: member.createdAt,
                    user: {
                        fullName: member.publicUserData.firstName + " " + member.publicUserData.lastName,
                        image: member.publicUserData.imageUrl,
                        email: member.publicUserData.identifier,
                    },
                };
            });

            setData(getData);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, organization]);

    return (
        <CardForm heading="Members">
            <DataTable columns={columns} data={data} smallSize />

            <Button
                type="button"
                variant="ghost"
                onClick={() => onOpen("invite-model")}
                className="flex-center m-auto mt-4 font-bold text-primary hover:text-primary"
            >
                <PlusIcon className="size-6 !text-primary" />
                Invite Member
            </Button>

            <InviteDialog />
            <UpdateDialog />
            <DeleteDialog />
        </CardForm>
    );
};

Members.displayName = "Members";
export default Members;
