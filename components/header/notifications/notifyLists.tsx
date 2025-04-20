import { NotifyItem } from "./notifyItem";
import { Notify } from "./index";

type NotifyLists = {
    data: Notify[];
};

export const NotifyLists = ({ data }: NotifyLists) => {
    return (
        <div className="">
            {data.map((notify, index) => (
                <NotifyItem key={notify._id} notify={notify} index={index} />
            ))}
        </div>
    );
};

NotifyLists.displayName = "NotifyLists";
