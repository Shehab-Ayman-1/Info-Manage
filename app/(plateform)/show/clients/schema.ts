export type ClientType = {
    _id: string;
    client: string;
    discount: number;
    solds: number;
    pending: number;
    bronzeTo: number;
    silverTo: number;
    level: "bronze" | "silver" | "gold";
};
