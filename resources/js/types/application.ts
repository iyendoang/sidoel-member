export interface Application {
    id: string;
    name: string;
    slug?: string;
    description?: string;
}


export interface ApplicationLink {
    url: string | null;
    label: string;
    active: boolean;
}
