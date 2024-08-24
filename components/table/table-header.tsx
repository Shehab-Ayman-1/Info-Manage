import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/ui/table";

type THeaderProps<TData> = {
    headerGroups: HeaderGroup<TData>[];
};

export const THeader = <TData,>({ headerGroups }: THeaderProps<TData>) => {
    return (
        <TableHeader className="bg-gradient-heavy">
            {headerGroups.map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-primary">
                    {headerGroup.headers.map((header) => {
                        const TDName = flexRender(header.column.columnDef.header, header.getContext());
                        return (
                            <TableHead key={header.id} className="p-2 text-center">
                                {!header.isPlaceholder && TDName}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </TableHeader>
    );
};
