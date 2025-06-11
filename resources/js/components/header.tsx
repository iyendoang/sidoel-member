import React from "react";

interface HeaderProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    children?: React.ReactNode;
}
export function Header({title, subtitle, children} : HeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4 border-b p-4 bg-zinc-50 dark:bg-zinc-800">
            <div>
                <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    {title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                    {subtitle}
                </div>
            </div>
            {children}
        </div>
    );
}
