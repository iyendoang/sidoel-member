import {ThemeProvider, useTheme} from '@/components/theme-provider';
import Logo from '@/assets/logo.svg';
import React from 'react';
import {Link} from '@inertiajs/react';
import {Sun, Moon} from 'lucide-react';
import {Button} from '@/components/ui/button';

function ThemeToggleButton() {
    const {theme, setTheme} = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
        </Button>
    );
}

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
                {/* Theme Toggle Button */}
                <div className="absolute top-4 right-4">
                    <ThemeToggleButton/>
                </div>
                {/* Logo + Form */}
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <Link
                            href={route('landing.index')}
                            className="inline-flex items-center justify-center gap-2 font-medium"
                        >
                            <div className="h-14 w-14 rounded-full p-2 flex items-center justify-center">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="h-full w-full object-contain bg-[#F5F8FC] dark:bg-gray-800 rounded-full"
                                />
                            </div>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </ThemeProvider>
    );
}
