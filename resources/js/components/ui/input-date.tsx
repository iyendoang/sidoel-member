// components/form/InputDate.tsx
import * as React from "react"
import {format, parseISO} from "date-fns"
import {CalendarIcon} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"

type InputDateProps = {
    name: string
    value: string | null
    onChange: (name: string, value: string) => void
    placeholder?: string
    className?: string
}

export const InputDate: React.FC<InputDateProps> = ({
                                                        name,
                                                        value,
                                                        onChange,
                                                        placeholder = "Pilih tanggal",
                                                        className,
                                                    }) => {
    const selected = value ? parseISO(value) : undefined

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            const formatted = format(date, "yyyy-MM-dd")
            onChange(name, formatted)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        "flex h-9 w-full items-center rounded-md border px-3 py-2 text-sm",
                        "border-gray-300 bg-white text-gray-900 placeholder:text-gray-500",
                        "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                        "transition-all duration-200 ease-in-out",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100",
                        "dark:placeholder:text-gray-400 dark:focus:ring-primary/30 dark:focus:border-primary",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                    {value ? format(parseISO(value), "yyyy-MM-dd") : (
                        <span className="text-muted-foreground">{placeholder}</span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selected} onSelect={handleSelect}/>
            </PopoverContent>
        </Popover>
    )
}
