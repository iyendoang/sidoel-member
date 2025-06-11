import React from "react";

export interface Lembaga {
    id: string;
    name: string;
    npsn: string;
    level?: string;
    logo?: string;
    description?: string;
    province?: string;
    city?: string;
    district?: string;
    sub_district?: string;
    address?: string;
    phone?: string;
    fax?: string;
    email?: string;
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
}


export interface LembagaLink {
    url: string | null;
    label: string;
    active: boolean;
}
export interface LembagaOption {
    npsn: string;
    name: string;
}