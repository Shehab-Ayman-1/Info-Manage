import * as Clerk from "@clerk/elements/common";

import { Button } from "@/ui/button";
import { Icons } from "@/ui/icons";

type ClerkConnectionProps = {
    isGlobalLoading: boolean;
    name: "facebook" | "google" | "microsoft";
    Icon: any;
};

export const ClerkConnection = ({ name, Icon, isGlobalLoading }: ClerkConnectionProps) => {
    return (
        <Clerk.Connection asChild name={name}>
            <Button type="button" size="sm" variant="outline" className="w-full min-w-[250px]" disabled={isGlobalLoading}>
                <Clerk.Loading scope={`provider:${name}`}>
                    {(isLoading) =>
                        isLoading ? (
                            <Icons.spinner className="size-4 animate-spin" />
                        ) : (
                            <>
                                <Icon className="mr-2 size-4" />
                                {name.toUpperCase()}
                            </>
                        )
                    }
                </Clerk.Loading>
            </Button>
        </Clerk.Connection>
    );
};

ClerkConnection.displayName = "ClerkConnection";
