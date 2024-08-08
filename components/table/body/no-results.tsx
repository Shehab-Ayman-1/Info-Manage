import { TableCell, TableRow } from "@/ui/table";

export const NoResults = ({ colSpan }: { colSpan: number }) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="h-24 text-center">
                No results.
            </TableCell>
        </TableRow>
    );
};

NoResults.displayName = "NoResults";
