// Tipe post
import {User} from "@/types/index";

export interface Post {
    id: number;
    title: string;
    body: string;
    html: string;
    created_at: string;
    updated_at: string;
    likes_count: string;
    user: {
        id: number;
        name: string;
        avatar: string | null;
        username: string;
    };
    topic: {
        id: number;
        slug: string;
        name: string;
        description: string;
    };
    route: {
        show: string;
    };
    has_liked: null | boolean;
    can: {
        update: boolean;
        delete: boolean;
        like: boolean;
    };
}

export interface Topic {
    id: number
    slug: string
    name: string
    description: string
}

export interface Comment {
    id: number
    body: string
    html: string
    likes_count: string
    post: Post | null
    user: User | null
    has_liked: null | boolean;
    can: {
        update: boolean
        delete: boolean
        like?: boolean
    }
    created_at: string
    updated_at: string
}
export interface PaginatedComments {
    data: Comment[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

