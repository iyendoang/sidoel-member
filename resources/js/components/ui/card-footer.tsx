import * as React from "react";
import { cn } from "@/lib/utils";

interface CardFooterCusProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardFooterCus = React.forwardRef<HTMLDivElement, CardFooterCusProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2 pt-4",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardFooterCus.displayName = "CardFooterCus";
