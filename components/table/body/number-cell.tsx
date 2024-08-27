import { Row } from "@tanstack/react-table";

type NumberCellProps = {
    row: Row<any>;
    name: string;
    showUnit?: boolean;
};

export const NumberCell = ({ row, name, showUnit }: NumberCellProps) => {
    const value: number = row.original[name] || row.getValue(name);
    const unitValue: string = row.original.unit || row.getValue("unit");

    return `${value?.toLocaleString()} ${showUnit ? unitValue : ""}`;
};

NumberCell.displayName = "NumberCell";
