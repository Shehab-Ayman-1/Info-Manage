import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";

type AlertErrorProps = {
    root?: {
        message?: string;
    };
};

export const AlertError = ({ root }: AlertErrorProps) => {
    if (!root) return;

    return (
        <Alert variant="warning">
            <AlertCircleIcon className="size-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>{root?.message}</AlertDescription>
        </Alert>
    );
};

AlertError.displayName = "AlertError";
