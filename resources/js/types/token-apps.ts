import {Lembaga, LembagaOption} from "@/types/lembaga";
import {Application} from "@/types/application";
import {Option} from "@/types/index";

export interface TokenApp {
    id: string;
    application: {
        id: number | null;
        name: string | null;
    };
    lembaga: {
        npsn: string | null;
        name: string | null;
    };
    token: string;
    application_id: number;
    token_npsn: string;
    status: 'active' | 'in_active' | 'suspended';
    is_valid: boolean;
    description: string | null;
    expired_at: string | null;
    expired_human: string | null;
    used_at: string | null;
    used_human: string | null;
    created_at: string;
    created_human: string;
}


export interface TokenAppLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface TokenAppFormProps {
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