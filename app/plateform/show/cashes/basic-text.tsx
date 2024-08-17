type BasicTextProps = {
    text: string;
    value: number;
};

export const BasicText = ({}: BasicTextProps) => {
    return (
        <div className="w-full max-w-sm rounded-md bg-primary-50 p-4 dark:bg-slate-800">
            <h1 className="text-xl font-bold text-primary">Details Of Locker</h1>

            <div className="flex-between my-4">
                <h3 className="">Total By Cash: </h3>
                <h3 className="">$1000,000</h3>
            </div>

            <div className="flex-between">
                <h3 className="">Total By Visa: </h3>
                <h3 className="">$1000,000</h3>
            </div>
        </div>
    );
};

BasicText.displayName = "BasicText";
