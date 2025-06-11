import {Lembaga, LembagaOption} from "@/types/lembaga";
import {Application} from "@/types/application";
import {Option} from "@/types/index";

export interface TokenApps {
    id: string;                      // id bigint di DB, gunakan string di TS
    application_id: string;          // FK ke aplikasi
    application?: Application;       // relasi aplikasi (optional, kalau eager loaded)
    token_npsn: string;              // FK ke lembaga.npsn
    lembaga?: Lembaga;               // relasi lembaga (optional, kalau eager loaded)
    token: string;                  // token unik
    expired_at: string;             // format ISO date string (dari DB date)
    is_valid: boolean;
    used_at?: string | null;        // timestamp nullable, bisa string ISO atau null
    description?: string | null;    // nullable string
    status: 'active' | 'expired' | 'revoked';
    created_at: string;             // timestamp created_at
    updated_at: string;             // timestamp updated_at
    deleted_at?: string | null;     // nullable soft delete timestamp
    current_page: number;
    per_page: number;
}


export interface TokenAppsLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface TokenAppsFormProps {
    data: Record<string, any>,
    errors: Record<string, string>,
    processing: boolean,
    setData: (key: string, value: any) => void,
    storeData: (e: React.FormEvent<HTMLFormElement>) => void,
    reset: () => void,
    applications: Option[],
    lembagas: LembagaOption[],
    lembagasData?: Lembaga[]
}