import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

type ClerkOTPProps = {};

export const ClerkOTP = ({}: ClerkOTPProps) => {
    return (
        <div className="grid items-center justify-center gap-y-2 sm:w-96">
            <Clerk.Field name="code" className="space-y-2">
                <div className="flex justify-center text-center">
                    <Clerk.Input
                        type="otp"
                        className="flex justify-center has-[:disabled]:opacity-50"
                        autoSubmit
                        render={({ value, status }) => {
                            return (
                                <div
                                    data-status={status}
                                    className={cn(
                                        "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                        {
                                            "z-10 ring-2 ring-ring ring-offset-background":
                                                status === "cursor" || status === "selected",
                                        },
                                    )}
                                >
                                    {value}
                                    {status === "cursor" && (
                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                            <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                        </div>
                                    )}
                                </div>
                            );
                        }}
                    />
                </div>
                <Clerk.FieldError className="block text-center text-sm text-destructive" />
            </Clerk.Field>

            <SignUp.Action
                asChild
                resend
                className="text-muted-foreground"
                fallback={({ resendableAfter }) => (
                    <Button variant="link" size="sm" disabled>
                        Didn&apos;t receive a code? Resend (<span className="tabular-nums">{resendableAfter}</span>)
                    </Button>
                )}
            >
                <Button type="button" variant="link" size="sm">
                    Didn&apos;t receive a code? Resend
                </Button>
            </SignUp.Action>
        </div>
    );
};

ClerkOTP.displayName = "ClerkOTP";
