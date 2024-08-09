import { Button } from "@/ui/button";

type ControllersProps = {
    previousPage: () => void;
    nextPage: () => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
};

export const Controllers = ({ previousPage, nextPage, getCanPreviousPage, getCanNextPage }: ControllersProps) => {
    const canPreviousPage = getCanPreviousPage();
    const canNextPage = getCanNextPage();

    if (!canPreviousPage && !canNextPage) return;

    return (
        <div className="flex-end w-full">
            <Button
                variant="outline"
                className="text-xs text-primary sm:text-sm"
                onClick={previousPage}
                disabled={!canPreviousPage}
            >
                Previous
            </Button>
            <Button variant="outline" className="text-xs text-primary sm:text-sm" onClick={nextPage} disabled={!canNextPage}>
                Next
            </Button>
        </div>
    );
};
