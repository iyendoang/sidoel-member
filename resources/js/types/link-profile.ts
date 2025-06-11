import {Lembaga, LembagaOption} from "@/types/lembaga";
import {Application} from "@/types/application";
import {Option} from "@/types/index";

export interface LinkProfiles {
    id: string;               // ID dari DB, disarankan string di TS
    link_profile_npsn: string;         // Relasi ke lembaga
    display_name?: string | null;
    bio?: string | null;
    avatar?: string | null;
    theme?: string | null;
    created_at: string;
    updated_at: string;
    lembaga: {
        id: number;
        name: string;
    };
    links?: Link[];                    // Relasi daftar link
}

export interface Link {
    id: string;
    link_npsn: string;
    title: string;
    url: string;
    icon: string | null;
    is_active: boolean;
    order: string;
    clicks: string;
    clicks_count: string;
    bg_color?: string | null;
    created_at: string;
    updated_at: string;
    lembaga: {
        id: string;
        name: string;
    };
    linkProfiles: {
        id: string;
        bio: string;
    };
}

export interface LinkClick {
    id: number | string;
    link_id: number;
    ip: string | null;
    user_agent: string | null;
    clicked_at: string;
}

export interface LinkProfileLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface LinkProfileFormProps {
    data: Record<string, any>;
    errors: Record<string, string>;
    processing: boolean;
    setData: (key: string, value: any) => void;
    storeData: (e: React.FormEvent<HTMLFormElement>) => void;
    reset: () => void;
    applications: Option[];
    lembagas: LembagaOption[];
    lembagasData?: Lembaga[];
    // Tambahan props jika relevan:
    profile?: LinkProfiles;
    links?: Link[];
}
