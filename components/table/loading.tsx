import { TableCell, TableRow } from "@/ui/table";
import { Loader2Icon } from "lucide-react";

type LoadingType = {
    colsLen: number;
};

export const Loading = ({ colsLen }: LoadingType) => {
    return (
        <TableRow>
            <TableCell colSpan={colsLen} className="text-center">
                <div className="flex-center">
                    <Loader2Icon className="inline-block animate-spin" />
                    <div className="flex gap-1">
                        <span className="animate-ping delay-0 ease-in-out" style={{ animationDuration: "2s" }}>
                            L
                        </span>
                        <span className="animate-ping delay-75 ease-in-out" style={{ animationDuration: "2s" }}>
                            o
                        </span>
                        <span className="animate-ping delay-100 ease-in-out" style={{ animationDuration: "2s" }}>
                            a
                        </span>
                        <span className="animate-ping delay-150 ease-in-out" style={{ animationDuration: "2s" }}>
                            d
                        </span>
                        <span className="animate-ping delay-200 ease-in-out" style={{ animationDuration: "2s" }}>
                            i
                        </span>
                        <span className="animate-ping delay-300 ease-in-out" style={{ animationDuration: "2s" }}>
                            g
                        </span>
                        <span className="animate-ping delay-500 ease-in-out" style={{ animationDuration: "2s" }}>
                            .
                        </span>
                        <span className="animate-ping delay-700 ease-in-out" style={{ animationDuration: "2s" }}>
                            .
                        </span>
                        <span className="animate-ping delay-1000 ease-in-out" style={{ animationDuration: "2s" }}>
                            .
                        </span>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
};

Loading.displayName = "Loading";
