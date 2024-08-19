"use client";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Separator } from "@/ui/separator";
import { Button } from "@/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";

type UserButtonProps = {};

export const UserButton = ({}: UserButtonProps) => {
    const { openUserProfile, signOut } = useClerk();
    const { user } = useUser();
    const { has } = useAuth();
    const router = useRouter();
    if (!user) return;

    const onOpen = (method: string) => {
        if (method === "organization") return router.push("/organizations");
        if (method === "user") return openUserProfile({ routing: "virtual" });
        if (method === "signout") return signOut({ redirectUrl: "/" });
    };

    const isAdmin = has?.({ role: "org:admin" });
    const btnStyle = "justify-start gap-4 px-4 py-8 text-muted-foreground";

    return (
        <Popover>
            <PopoverTrigger className="rounded-full bg-white p-1 dark:bg-black">
                <Image src={user.imageUrl} alt="user-image" width={25} height={25} className="rounded-full" />
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="w-auto rounded-xl bg-white p-8 pt-4 shadow-xl dark:border-slate-600 dark:bg-black"
            >
                <div className="flex-start">
                    <Image src={user.imageUrl} alt="user-image" width={40} height={40} className="rounded-full" />
                    <div className="">
                        <h3 className="text-lg font-bold dark:text-slate-300">{user.fullName}</h3>
                        <p className="text-base text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col sm:w-[400px]">
                    <PopoverClose asChild>
                        <Button variant="ghost" className={btnStyle} onClick={() => onOpen("user")}>
                            <SettingsIcon className="size-5 text-muted-foreground" />
                            Manage Account
                        </Button>
                    </PopoverClose>

                    {isAdmin && (
                        <PopoverClose asChild>
                            <Button variant="ghost" className={btnStyle} onClick={() => onOpen("organization")}>
                                <LogOutIcon className="size-5 text-muted-foreground" />
                                Manage Organization
                            </Button>
                        </PopoverClose>
                    )}

                    <PopoverClose asChild>
                        <Button variant="ghost" className={btnStyle} onClick={() => onOpen("signout")}>
                            <LogOutIcon className="size-5 text-muted-foreground" />
                            Sign Out
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    );
};

UserButton.displayName = "UserButton";
