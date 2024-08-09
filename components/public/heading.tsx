type HeadingProps = {
    title: string;
};

export const Heading = ({ title }: HeadingProps) => {
    return <h1 className="text-2xl font-bold text-primary">{title}</h1>;
};
