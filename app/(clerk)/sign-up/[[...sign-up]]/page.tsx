"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { FacebookIcon } from "lucide-react";
import { Fragment } from "react";

import { CardForm } from "@/components/page-structure/CardForm";
import { ClerkConnection } from "../../_components/start/clerk-connection";
import { ClerkOTP } from "../../_components/verifications/clerk-otp";
import { ClerkAction } from "../../_components/start/clerk-action";
import { ClerkField } from "../../_components/start/clerk-field";
import { Icons } from "@/ui/icons";

export default function SignUpPage() {
    return (
        <SignUp.Root>
            <Clerk.Loading>
                {(isGlobalLoading) => (
                    <Fragment>
                        <SignUp.Step name="start">
                            <CardForm heading="Create Your Account">
                                <div className="flex-between mb-6">
                                    <ClerkConnection name="facebook" isGlobalLoading={isGlobalLoading} Icon={FacebookIcon} />
                                    <ClerkConnection name="google" isGlobalLoading={isGlobalLoading} Icon={Icons.google} />
                                    <ClerkConnection name="microsoft" isGlobalLoading={isGlobalLoading} Icon={Icons.tailwind} />
                                </div>

                                <p className="mb-4 flex items-center gap-x-4 text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                    OR
                                </p>

                                <ClerkField label="Email Address" name="emailAddress" type="email" />
                                <ClerkField label="Password" name="password" type="password" />

                                <ClerkAction
                                    isGlobalLoading={isGlobalLoading}
                                    navigate={{ text: "Already Have An Account? Sign In", href: "/sign-in" }}
                                />
                            </CardForm>
                        </SignUp.Step>

                        <SignUp.Step name="verifications">
                            <CardForm heading="Verify Your Email">
                                <SignUp.Strategy name="email_code">
                                    <ClerkOTP />
                                    <ClerkAction isGlobalLoading={isGlobalLoading} />
                                </SignUp.Strategy>
                            </CardForm>
                        </SignUp.Step>
                    </Fragment>
                )}
            </Clerk.Loading>
        </SignUp.Root>
    );
}
