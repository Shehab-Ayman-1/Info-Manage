import { Row } from "@tanstack/react-table";

type DollarCellProps = {
    row: Row<any>;
    name: string;
};

export const DollarCell = ({ row, name }: DollarCellProps) => {
    const price: number = row.getValue(name);
    const formatted = new Intl.NumberFormat("es-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        trailingZeroDisplay: "stripIfInteger",
    }).format(price);

    return formatted;
};

DollarCell.displayName = "DollarCell";
