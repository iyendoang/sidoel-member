// components/LembagaForm.tsx
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Save, X, LoaderCircle} from "lucide-react";
import ButtonSubmitEnd from "@/components/ui/button-submit-end";

interface LembagaFormProps {
    data: Record<string, any>;
    errors: Record<string, string>;
    processing: boolean;
    setData: (key: string, value: any) => void;
    storeData: (e: React.FormEvent<HTMLFormElement>) => void;
    reset: () => void;
}

export default function LembagaForm({
                                            data,
                                            errors,
                                            processing,
                                            setData,
                                            storeData,
                                            reset,
                                        }: LembagaFormProps) {
    return (
        <form onSubmit={storeData}>
            <div className="p-4 space-y-4">
                {/* Nama */}
                <div>
                    <Label>Nama Lembaga</Label>
                    <Input type="text" name="name" value={data.name} onChange={e => setData("name", e.target.value)}
                           placeholder="Masukkan nama lembaga"/>
                    <p className="text-red-500 text-xs">{errors.name}</p>
                </div>

                {/* NPSN */}
                <div>
                    <Label>NPSN</Label>
                    <Input type="text" name="npsn" value={data.npsn} onChange={e => setData("npsn", e.target.value)}
                           placeholder="Masukkan NPSN"/>
                    <p className="text-red-500 text-xs">{errors.npsn}</p>
                </div>

                {/* Level */}
                <div>
                    <Label>Jenjang</Label>
                    <Input type="text" name="level" value={data.level} onChange={e => setData("level", e.target.value)}
                           placeholder="Contoh: MI, MTs, MA"/>
                    <p className="text-red-500 text-xs">{errors.level}</p>
                </div>

                {/* Logo */}
                <div>
                    <Label>Logo URL</Label>
                    <Input type="text" name="logo" value={data.logo} onChange={e => setData("logo", e.target.value)}
                           placeholder="URL logo atau path gambar"/>
                    <p className="text-red-500 text-xs">{errors.logo}</p>
                </div>

                {/* Deskripsi */}
                <div>
                    <Label>Deskripsi</Label>
                    <Textarea name="description" value={data.description}
                              onChange={e => setData("description", e.target.value)}/>
                    <p className="text-red-500 text-xs">{errors.description}</p>
                </div>

                {/* Alamat */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Provinsi</Label>
                        <Input type="text" name="province" value={data.province}
                               onChange={e => setData("province", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.province}</p>
                    </div>
                    <div>
                        <Label>Kota/Kabupaten</Label>
                        <Input type="text" name="city" value={data.city}
                               onChange={e => setData("city", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.city}</p>
                    </div>
                    <div>
                        <Label>Kecamatan</Label>
                        <Input type="text" name="district" value={data.district}
                               onChange={e => setData("district", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.district}</p>
                    </div>
                    <div>
                        <Label>Kelurahan/Desa</Label>
                        <Input type="text" name="sub_district" value={data.sub_district}
                               onChange={e => setData("sub_district", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.sub_district}</p>
                    </div>
                    <div className="col-span-full">
                        <Label>Alamat Lengkap</Label>
                        <Textarea name="address" value={data.address}
                                  onChange={e => setData("address", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.address}</p>
                    </div>
                </div>

                {/* Kontak */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Telepon</Label>
                        <Input type="text" name="phone" value={data.phone}
                               onChange={e => setData("phone", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.phone}</p>
                    </div>
                    <div>
                        <Label>Fax</Label>
                        <Input type="text" name="fax" value={data.fax} onChange={e => setData("fax", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.fax}</p>
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={data.email}
                               onChange={e => setData("email", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.email}</p>
                    </div>
                    <div>
                        <Label>Website</Label>
                        <Input type="url" name="website" value={data.website}
                               onChange={e => setData("website", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.website}</p>
                    </div>
                </div>

                {/* Sosial Media */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Facebook</Label>
                        <Input type="url" name="facebook" value={data.facebook}
                               onChange={e => setData("facebook", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.facebook}</p>
                    </div>
                    <div>
                        <Label>Twitter</Label>
                        <Input type="url" name="twitter" value={data.twitter}
                               onChange={e => setData("twitter", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.twitter}</p>
                    </div>
                    <div>
                        <Label>Instagram</Label>
                        <Input type="url" name="instagram" value={data.instagram}
                               onChange={e => setData("instagram", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.instagram}</p>
                    </div>
                    <div>
                        <Label>LinkedIn</Label>
                        <Input type="url" name="linkedin" value={data.linkedin}
                               onChange={e => setData("linkedin", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.linkedin}</p>
                    </div>
                    <div className="col-span-full">
                        <Label>YouTube</Label>
                        <Input type="url" name="youtube" value={data.youtube}
                               onChange={e => setData("youtube", e.target.value)}/>
                        <p className="text-red-500 text-xs">{errors.youtube}</p>
                    </div>
                </div>

                {/* Tombol */}
                <ButtonSubmitEnd reset={reset} processing={processing} />
            </div>
        </form>
    );
}
