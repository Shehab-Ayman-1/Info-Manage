type PaginationCountProps = {
    totalPaginationCount: number;
    currentPaginationCount: number;
};

const PaginationCount = ({ totalPaginationCount, currentPaginationCount }: PaginationCountProps) => {
    if (totalPaginationCount <= 20) return;

    return (
        <h3 className="whitespace-nowrap text-primary">
            Page {currentPaginationCount} of {totalPaginationCount}
        </h3>
    );
};

PaginationCount.displayName = "PaginationCount";
export default PaginationCount;
