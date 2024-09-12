"use client";
import { useKey } from "react-use";
import { useRef } from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

type CardFormProps = {
    submitText?: string;
    heading: string;
    disabled?: boolean;
    children: React.ReactNode;
    onSubmit?: (event: any) => void;
};

export const CardForm = ({ heading, submitText, disabled, children, onSubmit }: CardFormProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    useKey("Enter", () => ref.current?.click());

    return (
        <Card className="bg-gradient mx-auto mt-8 w-full max-w-3xl border-slate-400 shadow-lg dark:border-slate-600">
            <CardContent className="">
                <CardHeader
                    className={cn(
                        "bg-gradient-heavy w-[80%] rounded-lg text-center font-bold text-white !shadow-xl",
                        "mx-auto -mt-8 mb-6 sm:-mt-[4.5rem] sm:!py-10",
                    )}
                >
                    <CardTitle className="text-xl leading-none sm:text-2xl">{heading}</CardTitle>
                </CardHeader>

                {children}

                {submitText && (
                    <CardFooter className="mt-6 p-0 pt-4">
                        <Button
                            className="w-full text-base sm:text-lg"
                            type="submit"
                            size="lg"
                            ref={ref}
                            disabled={disabled}
                            onSubmit={onSubmit}
                        >
                            {submitText}
                        </Button>
                    </CardFooter>
                )}
            </CardContent>
        </Card>
    );
};

CardForm.displayName = "CardForm";
