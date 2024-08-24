type PaginationCountProps = {
    totalPaginationCount: number;
    currentPaginationCount: number;
};

export const PaginationCount = ({ totalPaginationCount, currentPaginationCount }: PaginationCountProps) => {
    if (totalPaginationCount <= 1) return;

    return (
        <h3 className="whitespace-nowrap text-primary">
            Page {currentPaginationCount} of {totalPaginationCount}
        </h3>
    );
};

PaginationCount.displayName = "PaginationCount";
