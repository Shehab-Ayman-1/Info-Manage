type CashCardProps = {
    heading: string;
    isAdditionalSubscribe?: boolean;
    items: {
        title: string;
        value: number;
    }[];
};

export const CashCard = ({ heading, isAdditionalSubscribe, items }: CashCardProps) => {
    return (
        <div className="w-full max-w-sm rounded-md bg-primary-50 p-4 shadow-md dark:bg-slate-800 dark:shadow-slate-500">
            <h1 className="text-xl font-bold text-primary">{heading}</h1>

            {items.map((item, index) => (
                <div key={index} className="flex-between my-4">
                    <h3 className="">{isAdditionalSubscribe ? item.title : "????"} </h3>
                    <h3 className="">${isAdditionalSubscribe ? item.value.toLocaleString() : "????"}</h3>
                </div>
            ))}
        </div>
    );
};

CashCard.displayName = "CashCard";
