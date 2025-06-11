import {ReactNode} from "react";

export interface HeroType {
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    subtitle: string;
    get_started: {
        title: string;
        url: string;
        color: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
    }[];
}

export interface FeatureItem {
    title: string;
    description: string;
    image: string;
}

export interface FeaturesData {
    title: string;
    subtitle: string;
    lists: FeatureItem[];
}

export interface Testimonial {
    image: string;
    name: string;
    userName: string;
    comment: string;
}

export interface FAQProps {
    question: string;
    answer: string;
    value: string;
}

export interface HowItWorksItem {
    icon: "MedalIcon" | "GiftIcon" | "MapIcon" | "PlaneIcon";
    title: string;
    description: string;
}

export interface Pricing {
    title: string;
    popular: number; // 0 atau 1
    price: number;
    description: string;
    buttonText: string;
    benefitList: string[];
}

export interface Service {
    title: string;
    description: string;
    icon: ReactNode;
}

export interface Sponsor {
    icon: ReactNode;
    name: string;
}

export interface StatType {
    quantity: string;
    description: string;
}

export interface TeamProps {
    imageUrl: string;
    name: string;
    position: string;
    description: string;
    socialNetworks: SociaNetworkslProps[];
}

export interface SociaNetworkslProps {
    name: string;
    url: string;
}
export enum PopularPlanType {
    NO = 0,
    YES = 1,
}

export interface PricingProps {
    title: string;
    popular: PopularPlanType;
    price: number;
    description: string;
    buttonText: string;
    benefitList: string[];
}

export interface AboutType {
    image: string;
    description: string;
}

export interface RootObject {
    hero: HeroType;
    features: FeaturesData[];
    testimonials: Testimonial[];
    fas_lists: FAQProps[];
    how_it_works: HowItWorksItem[];
    pricing: Pricing[];
    servies: Service[];
    sponsors: Sponsor[];
    stats: StatType[];
    teamList: TeamProps[];
}
