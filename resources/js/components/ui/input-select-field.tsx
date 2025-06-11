// components/form/InputSelectField.tsx
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

type Option = { label: string; value: string }

type InputSelectFieldProps = {
    name: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    options: Option[]
    className?: string
}

export const InputSelectField = ({
                                value,
                                onChange,
                                options,
                                placeholder = "Pilih opsi",
                                className,
                            }: InputSelectFieldProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
