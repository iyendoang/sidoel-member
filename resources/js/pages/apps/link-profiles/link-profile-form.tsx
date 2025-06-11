import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, X, LoaderCircle } from "lucide-react";
import { TokenAppsFormProps } from "@/types/token-apps";
import { InputSelect, InputSelectTrigger } from "@/components/ui/input-select";
import { SelectOption } from "@/types/select-options";
import hasAnyRole from "@/utils/has-role";
import {Lembaga} from "@/types/lembaga";
import {Link} from "@/types/link-profile";
import ButtonSubmitEnd from "@/components/ui/button-submit-end";

interface LinkProfileFormProps {
    data: Record<string, any>;
    errors: Record<string, string>;
    processing: boolean;
    setData: (key: string, value: any) => void;
    storeData: (e: React.FormEvent<HTMLFormElement>) => void;
    reset: () => void;
    lembagasData?: Lembaga[];
    links?: Link[];
}

export default function LinkProfileForm({
                                            data,
                                            errors,
                                            processing,
                                            setData,
                                            storeData,
                                            reset,
                                            lembagasData,
                                        }: LinkProfileFormProps) {
    const optionsLembagas: SelectOption[] = (lembagasData ?? []).map(
        (item: { npsn: string; name: string }): SelectOption => ({
            value: item.npsn,
            label: item.name,
        })
    );

    return (
        <form onSubmit={storeData} encType={"multipart/form-data"}>
            <div className="p-4 pt-0 space-y-4">
                {hasAnyRole(["super-admin"]) && (
                    <div>
                        {/* Pilih Lembaga */}
                        <Label htmlFor="link_profile_npsn">Lembaga</Label>
                        <InputSelect
                            options={optionsLembagas}
                            value={data.link_profile_npsn || ""}
                            isDialog={true}
                            onValueChange={(v) => {
                                if (data.link_profile_npsn !== v) {
                                    setData("link_profile_npsn", v);
                                }
                            }}
                            clearable
                        >
                            {(provided) => <InputSelectTrigger {...provided} />}
                        </InputSelect>
                        <p className="text-red-500 text-xs">{errors.link_profile_npsn}</p>
                    </div>
                )}

                {/* Display name */}
                <div>
                    <Label>Display name</Label>
                    <Input
                        type="text"
                        name="display_name"
                        value={data.display_name}
                        onChange={(e) => setData("display_name", e.target.value)}
                        placeholder="Masukkan Display name"
                    />
                    <p className="text-red-500 text-xs">{errors.display_name}</p>
                </div>

                {/* THEME */}
                <div>
                    <Label>THEME</Label>
                    <Input
                        type="text"
                        name="theme"
                        value={data.theme}
                        onChange={(e) => setData("theme", e.target.value)}
                        placeholder="Masukkan THEME"
                    />
                    <p className="text-red-500 text-xs">{errors.theme}</p>
                </div>

                {/* Avatar */}
                <div>
                    <Label>Avatar</Label>
                    <Input
                        type="file"
                        name="avatar"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setData("avatar", file);
                        }}
                    />
                    <p className="text-red-500 text-xs">{errors.avatar}</p>
                </div>

                {/* Bio */}
                <div>
                    <Label>Bio</Label>
                    <Textarea
                        name="bio"
                        value={data.bio}
                        onChange={(e) => setData("bio", e.target.value)}
                    />
                    <p className="text-red-500 text-xs">{errors.bio}</p>
                </div>

                {/* Buttons */}
                <ButtonSubmitEnd reset={reset} processing={processing} />
            </div>
        </form>
    );
}
