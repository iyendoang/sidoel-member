// components/LembagaFormExiting.tsx
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Save, X, LoaderCircle} from "lucide-react";
import {SelectOption} from "@/types/select-options";
import {Lembaga} from "@/types/lembaga";
import {InputSelect, InputSelectTrigger} from "@/components/ui/input-select";
import ButtonSubmitEnd from "@/components/ui/button-submit-end";

interface LembagaFormProps {
    data: Record<string, any>;
    errors: Record<string, string>;
    processing: boolean;
    lembaga_options: Record<string, any>;
    setData: (key: string, value: any) => void;
    storeData: (e: React.FormEvent<HTMLFormElement>) => void;
    reset: () => void;
}

export default function LembagaFormExiting({
                                               data,
                                               errors,
                                               processing,
                                               setData,
                                               lembaga_options,
                                               storeData,
                                               reset,
                                           }: LembagaFormProps) {
    const lembagas: SelectOption[] = (lembaga_options.lembaga_options ?? []).map(
        (item: { npsn: string; name: string }): SelectOption => ({
            value: item.npsn,
            label: item.name,
        })
    );

    return (
        <form onSubmit={storeData}>
            <div className="p-4 space-y-4">
                {/* NPSN */}
                <div>
                    {/* Pilih Lembaga */}
                    <Label htmlFor="npsn">Lembaga</Label>
                    <InputSelect
                        options={lembagas}
                        value={data.npsn || ""}
                        isDialog={true}
                        onValueChange={(v) => {
                            if (data.npsn !== v) {
                                setData("npsn", v);
                            }
                        }}
                        clearable
                    >
                        {(provided) => <InputSelectTrigger {...provided} />}
                    </InputSelect>
                    <p className="text-red-500 text-xs">{errors.npsn}</p>
                </div>
                {/* Tombol */}
                <ButtonSubmitEnd reset={reset} processing={processing} />
            </div>
        </form>
    );
}
