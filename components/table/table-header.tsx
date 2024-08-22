import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/ui/table";

type THeaderProps<TData> = {
    headerGroups: HeaderGroup<TData>[];
};

export const THeader = <TData,>({ headerGroups }: THeaderProps<TData>) => {
    return (
        <TableHeader className="bg-gradient-heavy print:border-b print:border-b-slate-300">
            {headerGroups.map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-primary">
                    {headerGroup.headers.map((header) => {
                        const TdName = flexRender(header.column.columnDef.header, header.getContext());
                        return (
                            <TableHead key={header.id} className="px-0 py-2 text-center !text-xs">
                                {!header.isPlaceholder && TdName}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </TableHeader>
    );
};
