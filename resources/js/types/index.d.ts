// resources/js/types/index.d.ts

import {Config} from 'ziggy-js';
import {Role} from './role';

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    email_verified_at?: string;
    avatar?: string;
    is_active: boolean;
    roles: Role[];
}

export interface UserLink {
    url: string | null;
    label: string;
    active: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    appName: string;
    auth: {
        user: User;
        permissions: Record<string, boolean>;
        roles: Role[];
        super: boolean;
    };
    ziggy: Config & { location: string };
    flash: {
        success?: string;
        error?: string;
        info?: string;
        warning?: string;
    };
};

interface Option {
    id: string;
    name: string;
}