import { Permission } from "./permission";

export interface Role {
    id: string;
    name: string;
    permissions: Permission[];
}

export interface RoleLink {
    url: string | null;
    label: string;
    active: boolean;
}
