import { NotifyItem } from "./notifyItem";
import { Notify } from ".";

type NotifyLists = {
    data: Notify[];
};

export const NotifyLists = ({ data }: NotifyLists) => {
    return (
        <div className="">
            {data.map((notify) => (
                <NotifyItem key={notify._id} notify={notify} />
            ))}
        </div>
    );
};

NotifyLists.displayName = "NotifyLists";
