import * as SignUp from "@clerk/elements/sign-up";
import * as Clerk from "@clerk/elements/common";

import { Button } from "@/ui/button";
import { Icons } from "@/ui/icons";
import Link from "next/link";

type ClerkActionProps = {
    isGlobalLoading: boolean;
    navigate?: {
        text: string;
        href: string;
    };
};

export const ClerkAction = ({ isGlobalLoading, navigate }: ClerkActionProps) => {
    return (
        <div className="grid w-full gap-4">
            <SignUp.Action submit asChild>
                <Button disabled={isGlobalLoading}>
                    <Clerk.Loading>
                        {(isLoading) => (isLoading ? <Icons.spinner className="size-4 animate-spin" /> : "Continue")}
                    </Clerk.Loading>
                </Button>
            </SignUp.Action>

            {navigate && (
                <Button variant="link" size="sm" asChild>
                    <Link href={navigate.href}>{navigate.text}</Link>
                </Button>
            )}
        </div>
    );
};

ClerkAction.displayName = "ClerkAction";
