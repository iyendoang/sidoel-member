import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Save, X, LoaderCircle, Building2Icon} from "lucide-react";
import {TokenAppFormProps} from "@/types/token-apps";
import {InputToken} from "@/components/ui/input-token";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {InputSelect, InputSelectTrigger} from "@/components/ui/input-select";
import {useState} from "react";
import {SelectOption} from "@/types/select-options";
import {Lembaga} from "@/types/lembaga";
import hasAnyPermission from "@/utils/has-permissions";
import hasAnyRole from "@/utils/has-role";
import {InputDate} from "@/components/ui/input-date";


export default function TokenAppsForm({
                                          data,
                                          errors,
                                          processing,
                                          setData,
                                          storeData,
                                          reset,
                                          applications,
                                          lembagasData
                                      }: TokenAppFormProps) {
    const lembagas: SelectOption[] = (lembagasData as Lembaga[]).map((l: Lembaga): SelectOption => ({
        value: l.npsn,
        label: l.name,
    }));

    return (
        <form onSubmit={storeData}>
            <div className="p-4 space-y-4">
                {/* Pilih Aplikasi */}
                <div>
                    <Label htmlFor="application_id">Aplikasi</Label>
                    <Select
                        value={data.application_id?.toString() || ""}
                        onValueChange={(value) => {
                            if (data.application_id?.toString() !== value) {
                                setData("application_id", Number(value));
                            }
                        }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="-- Pilih Aplikasi --"/>
                        </SelectTrigger>
                        <SelectContent>
                            {applications.map((app) => (
                                <SelectItem key={app.id} value={app.id.toString()}>
                                    {app.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-red-500 text-xs">{errors.application_id}</p>
                </div>
                {(hasAnyRole(['super-admin'])) &&
                    <>
                        <div>
                            {/* Pilih Lembaga */}
                            <Label htmlFor="token_npsn">Lembaga</Label>
                            <InputSelect
                                options={lembagas}
                                value={data.token_npsn || ""}
                                isDialog={true}
                                onValueChange={(v) => {
                                    if (data.token_npsn !== v) {
                                        setData("token_npsn", v);
                                    }
                                }}
                                clearable
                            >
                                {(provided) => <InputSelectTrigger {...provided} />}
                            </InputSelect>
                            <p className="text-red-500 text-xs">{errors.token_npsn}</p>
                        </div>
                        {/* Expired At */
                        }
                        <div>
                            <Label htmlFor="expired_at">Tanggal Expired</Label>
                            <InputDate
                                name="expired_at"
                                value={data.expired_at}
                                onChange={setData}
                            />
                            <p className="text-red-500 text-xs">{errors.expired_at}</p>
                        </div>

                        {/* Status */}
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status || ""}
                                onValueChange={(value) => setData("status", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="-- Pilih Status --"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="in_active">Tidak AKtif</SelectItem>
                                    <SelectItem value="suspended">Diblokir</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500 text-xs">{errors.status}</p>
                        </div>
                    </>
                }

                {/* Token */
                }
                <div>
                    <Label htmlFor="token">Token</Label>
                    <InputToken
                        value={data.token}
                        onChange={(e) => setData("token", e.target.value)}
                        onGenerate={() => {
                            const newToken = Math.random().toString(36).substring(2, 10).toUpperCase();
                            setData("token", newToken);
                        }}
                        placeholder="Token otomatis atau manual"
                    />
                    <p className="text-red-500 text-xs">{errors.token}</p>
                </div>

                {/* Deskripsi */
                }
                <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <p className="text-red-500 text-xs">{errors.description}</p>
                </div>

                {/* Tombol Aksi */
                }
                <div className="flex justify-between pt-4">
                    <Button variant="destructive" type="button" onClick={() => reset()}>
                        <X className="mr-1"/> Cancel
                    </Button>
                    <Button variant="default" type="submit" disabled={processing}>
                        {processing ? <LoaderCircle className="animate-spin mr-1"/> : <Save className="mr-1"/>} Simpan
                        Data
                    </Button>
                </div>
            </div>
        </form>
    )
        ;
}
