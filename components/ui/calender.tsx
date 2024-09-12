"use client";
import { Dispatch, Fragment, SetStateAction } from "react";
import { CalendarSearchIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Calendar } from "@/ui/calendar";
import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

type DatePickerWithRangeType = {
    className?: string;
    initialFocus?: boolean;
    date: DateRange | undefined;
    setDate: Dispatch<SetStateAction<DateRange | undefined>>;
};

export const DatePickerWithRange = ({ className, initialFocus, date, setDate }: DatePickerWithRangeType) => {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarSearchIcon className="mx-2 size-4" />

                        {date?.from && date?.to && (
                            <Fragment>
                                {format(date.from, "LLL dd")} {" >> "} {format(date.to, "LLL dd")}
                            </Fragment>
                        )}

                        {date?.from && !date?.to && format(date.from, "LLL dd, y")}

                        {!date?.from && <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[300px] p-0" align="start">
                    <Calendar
                        initialFocus={initialFocus}
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date?.from}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

DatePickerWithRange.displayName = "DatePickerWithRange";
