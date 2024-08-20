import * as Clerk from "@clerk/elements/common";
import { Input } from "@/ui/input";

type ClerkFieldProps = {
    label: string;
    name: "emailAddress" | "password" | "identifier";
    type: "text" | "email" | "password";
};

export const ClerkField = ({ label, name, type }: ClerkFieldProps) => {
    return (
        <Clerk.Field name={name} className="space-y-2">
            <Clerk.Input type="email" required asChild>
                <Input type={type} placeholder={label} />
            </Clerk.Input>
            <Clerk.FieldError className="block text-sm text-destructive" />
        </Clerk.Field>
    );
};

ClerkField.displayName = "ClerkField";
