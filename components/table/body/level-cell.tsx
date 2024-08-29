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

    if (value === "completed") return <Badge className="bg-rose-900 text-white hover:bg-rose-800">{value}</Badge>;
    if (value === "pending") return <Badge className="bg-purple-700 text-white hover:bg-purple-800">{value}</Badge>;
    if (value === "restore") return <Badge className="bg-blue-700 text-white hover:bg-blue-800">{value}</Badge>;

    if (value === "withdraw") return <Badge className="bg-rose-900 text-white hover:bg-rose-800">{value}</Badge>;
    if (value === "deposit") return <Badge className="bg-purple-700 text-white hover:bg-purple-800">{value}</Badge>;

    if (value === "cash") return <Badge className="bg-rose-900 text-white hover:bg-rose-800">{value}</Badge>;
    if (value === "visa") return <Badge className="bg-purple-700 text-white hover:bg-purple-800">{value}</Badge>;

    if (value === "admin") return <Badge className="bg-rose-900 text-white hover:bg-rose-800">{value}</Badge>;
    if (value === "member") return <Badge className="bg-purple-700 text-white hover:bg-purple-800">{value}</Badge>;
};

BadgeCell.displayName = "BadgeCell";
