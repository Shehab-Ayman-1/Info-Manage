import { Row } from "@tanstack/react-table";

type MinimumCellProps = {
    row: Row<any>;
    name: string;
};

export const MinimumCell = ({ row, name }: MinimumCellProps) => {
    const value: number = row.getValue(name);
    return value?.toLocaleString();
};

MinimumCell.displayName = "MinimumCell";
