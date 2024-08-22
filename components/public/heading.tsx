type HeadingProps = {
    title: string;
};

export const Heading = ({ title }: HeadingProps) => {
    return <h1 className="text-2xl font-bold capitalize text-primary">{title}</h1>;
};
