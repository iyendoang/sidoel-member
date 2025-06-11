import {Lembaga} from "@/types/lembaga";
import {User} from "@/types/index";

export  interface UserLembaga {
    current_page: number;
    per_page: number;
    id: string;
    user_id: string;
    user_npsn?: string;
    lembaga: Lembaga;
    user: User;
}
export interface UserLembagaLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface UserLembagaFilter {
    id: string;
    name: string;
    npsn: string;
}