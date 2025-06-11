
import React from 'react'
import {ThemeProvider} from "@/components/theme-provider";

export default function LandingLayout({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="dark">
            {children}
        </ThemeProvider>
    )
}
