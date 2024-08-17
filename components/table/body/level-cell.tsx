import { Row } from "@tanstack/react-table";
import { Badge } from "@/ui/badge";

type BadgeCell = {
    row: Row<any>;
    name: "level" | "state" | "process" | "method" | "role";
};

export const BadgeCell = ({ row, name }: BadgeCell) => {
    const value = row.getValue(name);

    if (value === "bronze") return <Badge className="bg-rose-900 text-white hover:bg-rose-800">{value}</Badge>;
    if (value === "silver") return <Badge className="bg-slate-500 text-white hover:bg-slate-600">{value}</Badge>;
    if (value === "gold") return <Badge className="bg-amber-500 text-black hover:bg-amber-600">{value}</Badge>;

    if (value === "completed") return <Badge className="bg-green-500 text-black hover:bg-green-600">{value}</Badge>;
    if (value === "pending") return <Badge className="bg-violet-500 text-white hover:bg-violet-600">{value}</Badge>;

    if (value === "withdraw") return <Badge className="bg-rose-500 text-white hover:bg-rose-600">{value}</Badge>;
    if (value === "deposit") return <Badge className="bg-lime-500 text-black hover:bg-lime-600">{value}</Badge>;

    if (value === "cash") return <Badge className="bg-fuchsia-500 text-white hover:bg-fuchsia-600">{value}</Badge>;
    if (value === "visa") return <Badge className="bg-indigo-500 text-white hover:bg-indigo-600">{value}</Badge>;

    if (value === "admin") return <Badge className="bg-rose-500 text-white hover:bg-rose-600">{value}</Badge>;
    if (value === "member") return <Badge className="bg-lime-500 text-black hover:bg-lime-600">{value}</Badge>;
};

BadgeCell.displayName = "BadgeCell";
