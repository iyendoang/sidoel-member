import * as React from "react";
import { cn } from "@/lib/utils";
import { KeyRound, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InputTokenProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onGenerate?: () => void;
    disabled?: boolean;
}

const InputToken = React.forwardRef<HTMLInputElement, InputTokenProps>(
    ({ className, onGenerate, disabled, ...props }, ref) => {
        return (
            <div className="relative flex items-center">
                {/* Icon */}
                <div className="absolute left-3 text-gray-400 dark:text-gray-500">
                    <KeyRound className="w-4 h-4" />
                </div>

                {/* Input */}
                <input
                    ref={ref}
                    className={cn(
                        "flex h-9 w-full rounded-md border px-10 pr-24 py-2 text-sm",
                        "border-gray-300 bg-white text-gray-900 placeholder:text-gray-500",
                        "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                        "transition-all duration-200 ease-in-out",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100",
                        "dark:placeholder:text-gray-400 dark:focus:ring-primary/30 dark:focus:border-primary",
                        className
                    )}
                    autoComplete="off"
                    autoFocus={false}
                    disabled={disabled}
                    {...props}
                />

                {/* Generate Button */}
                {onGenerate && (
                    <div className="absolute right-1.5">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1"
                            onClick={onGenerate}
                            disabled={disabled}
                        >
                            <RefreshCcw className="w-3 h-3 mr-1" /> Generate
                        </Button>
                    </div>
                )}
            </div>
        );
    }
);

InputToken.displayName = "InputToken";

export { InputToken };
