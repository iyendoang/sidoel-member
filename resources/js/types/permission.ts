export interface Permission {
    id: string;
    name: string;
}

export interface PermissionLink {
    url: string | null;
    label: string;
    active: boolean;
}
