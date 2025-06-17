import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Save, X, LoaderCircle, Home, User, Settings, Search, Bell} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Lembaga} from "@/types/lembaga";
import {InputSelect, InputSelectTrigger} from "@/components/ui/input-select";
import InputSwitch from "@/components/ui/input-switch";
import {InputSelectField} from "@/components/ui/input-select-field";
import ButtonSubmitEnd from "@/components/ui/button-submit-end";

interface LinkFormProps {
    data: Record<string, any>;
    errors: Record<string, string>;
    link_profile_id: string;
    processing: boolean;
    setData: (key: string, value: any) => void;
    storeData: (e: React.FormEvent<HTMLFormElement>) => void;
    reset: () => void;
    lembagasData?: Lembaga[]; // ← tambahan
}

export default function LinkForm({
                                     data,
                                     errors,
                                     processing,
                                     setData,
                                     storeData,
                                     reset,
                                     link_profile_id,
                                     lembagasData = [], // ← default value
                                 }: LinkFormProps) {
    const iconOptions = [
        {
            value: "home",
            label: "Home",
            icon: Home, // Komponen React, bukan <Home />
        },
        {
            value: "user",
            label: "User",
            icon: User,
        },
        {
            value: "settings",
            label: "Settings",
            icon: Settings,
        },
        {
            value: "search",
            label: "Search",
            icon: Search,
        },
        {
            value: "bell",
            label: "Bell",
            icon: Bell,
        },
    ];

    return (
        <div className="p-4 pt-0 space-y-4">
            <form onSubmit={storeData} className="space-y-4">
                {/* Lembaga NPSN */}
                <div>
                    <Label htmlFor="link_npsn">Lembaga (NPSN)</Label>
                    <InputSelectField
                        name="link_npsn"
                        value={data.link_npsn?.toString() || ""}
                        onChange={(value) => setData("link_npsn", value)}
                        options={lembagasData.map((item) => ({
                            label: `${item.name} (${item.npsn})`,
                            value: item.npsn,
                        }))}
                        placeholder="-- Pilih Lembaga --"
                    />


                    <p className="text-red-500 text-xs">{errors.link_npsn}</p>
                </div>

                {/* Title */}
                <input type="hidden" name="link_profile_id" id="link_npsn" value={link_profile_id} />
                <div>
                    <Label htmlFor="title">Judul</Label>
                    <Input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        placeholder="Masukkan Judul"
                    />
                    <p className="text-red-500 text-xs">{errors.title}</p>
                </div>

                {/* URL */}
                <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                        type="text"
                        name="url"
                        value={data.url}
                        onChange={(e) => setData("url", e.target.value)}
                        placeholder="https://contoh.com"
                    />
                    <p className="text-red-500 text-xs">{errors.url}</p>
                </div>

                {/* Icon */}
                <div>
                    <Label htmlFor="icon">Icon</Label>
                    <InputSelect
                        options={iconOptions}
                        value={data.icon || ""}
                        isDialog={true}
                        onValueChange={(v) => {
                            if (data.icon !== v) {
                                setData("icon", v);
                            }
                        }}
                        clearable
                    >
                        {(provided) => <InputSelectTrigger {...provided} />}
                    </InputSelect>
                    <p className="text-red-500 text-xs">{errors.icon}</p>
                </div>

                {/* Background Color */}
                <div>
                    <Label htmlFor="bg_color">Warna Background</Label>
                    <Input
                        type="text"
                        name="bg_color"
                        value={data.bg_color}
                        onChange={(e) => setData("bg_color", e.target.value)}
                        placeholder="Contoh: bg-blue-500"
                    />
                    <p className="text-red-500 text-xs">{errors.bg_color}</p>
                </div>

                {/* Order */}
                <div>
                    <Label htmlFor="order">Urutan Tampil</Label>
                    <Input
                        type="number"
                        name="order"
                        value={data.order}
                        onChange={(e) => setData("order", parseInt(e.target.value))}
                        placeholder="Masukkan urutan"
                    />
                    <p className="text-red-500 text-xs">{errors.order}</p>
                </div>

                {/* Status */}
                <div>
                    <InputSwitch
                        id="is_active"
                        label="Status Aktif"
                        checked={data.is_active ?? true}
                        onCheckedChange={(checked) => setData("is_active", checked)}
                        error={errors.is_active}
                    />
                </div>
                <div>
                    <InputSwitch
                        id="is_safemode"
                        label="Safe Mode CBT"
                        checked={data.is_safemode ?? true}
                        onCheckedChange={(checked) => setData("is_safemode", checked)}
                        error={errors.is_safemode}
                    />
                </div>

                {/* Buttons */}
                <ButtonSubmitEnd reset={reset} processing={processing} />
            </form>
        </div>
    );
}
