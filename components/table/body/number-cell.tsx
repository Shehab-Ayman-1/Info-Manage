import { Row } from "@tanstack/react-table";

type NumberCellProps = {
    row: Row<any>;
    name: string;
};

export const NumberCell = ({ row, name }: NumberCellProps) => {
    const value: number = row.original[name] || row.getValue(name);
    return value?.toLocaleString();
};

NumberCell.displayName = "NumberCell";
