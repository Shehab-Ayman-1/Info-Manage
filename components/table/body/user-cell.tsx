import { Row } from "@tanstack/react-table";
import Image from "next/image";

type UserCellProps = {
    row: Row<any>;
};

export const UserCell = ({ row }: UserCellProps) => {
    const user: any = row.getValue("user");
    if (!user) return;

    return (
        <div className="flex-start">
            <div className="h-8 w-8 overflow-hidden rounded-full">
                <Image src={user.image} alt="user-logo" width={30} height={30} className="h-full w-full" />
            </div>
            <div className="text-start">
                <h3 className="text-base font-bold">{user.fullName}</h3>
                <p className="text-sm font-normal">{user.email}</p>
            </div>
        </div>
    );
};

UserCell.displayName = "UserCell";
