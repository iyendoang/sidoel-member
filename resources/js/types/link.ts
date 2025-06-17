export interface Link {
    id: string;
    link_npsn: string;
    title: string;
    url: string;
    icon: string | null;
    is_active: boolean;
    is_safemode: boolean;
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

export interface LinkLink {
    url: string | null;
    label: string;
    active: boolean;
}
