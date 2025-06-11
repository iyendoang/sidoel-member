import * as React from "react"
import {cn} from "@/lib/utils"

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({className, ...props}, ref) => {
    return (
        <textarea
            ref={ref}
            className={cn(
                "flex w-full rounded-md border px-3 py-2 text-sm",
                "border-gray-300 bg-white text-gray-900 placeholder:text-gray-500",
                "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                "transition-all duration-200 ease-in-out",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100",
                "dark:placeholder:text-gray-400 dark:focus:ring-primary/30 dark:focus:border-primary",
                className
            )}
            {...props}
        />
    )
})
Textarea.displayName = "Textarea"

export {Textarea}
