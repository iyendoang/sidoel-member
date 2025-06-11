import React from "react";
import {CustomIcons} from "@/components/custom/icon";

interface DynamicIconComponentProps {
    dynamicIconName: keyof typeof CustomIcons;
    className?: string;
}

const DynamicIconComponent: React.FC<DynamicIconComponentProps> = ({ dynamicIconName, className }) => {
    const Icon = CustomIcons[dynamicIconName];
    if (!Icon) return null;
    return <Icon className={className} />;
};

export default DynamicIconComponent;
