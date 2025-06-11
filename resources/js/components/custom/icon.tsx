// src/components/custom/icons.tsx
import React from "react";
import {
    Medal,
    Gift,
    MapPin,
    Plane,
    Wallet,
    BarChart2,
    Search,
} from "lucide-react";

// Buat komponen ikon dengan properti SVG
export const MedalIcon = (props: React.SVGProps<SVGSVGElement>) => <Medal {...props} />;
export const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => <Gift {...props} />;
export const MapIcon = (props: React.SVGProps<SVGSVGElement>) => <MapPin {...props} />;
export const PlaneIcon = (props: React.SVGProps<SVGSVGElement>) => <Plane {...props} />;
export const ChartIcon = (props: React.SVGProps<SVGSVGElement>) => <BarChart2 {...props} />;
export const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => <Wallet {...props} />;
export const MagnifierIcon = (props: React.SVGProps<SVGSVGElement>) => <Search {...props} />;

// Objek untuk pemetaan ikon secara dinamis
export const CustomIcons = {
    MedalIcon,
    GiftIcon,
    MapIcon,
    PlaneIcon,
    ChartIcon,
    WalletIcon,
    MagnifierIcon,
};
