import AppNavbar from '@/components/app-navbar'
import {AppSidebar} from '@/components/app-sidebar'
import {ThemeProvider} from '@/components/theme-provider'
import {SidebarProvider} from '@/components/ui/sidebar'
import {Toaster} from '@/components/ui/toaster'
import React, {useEffect} from 'react'
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {toast} from "@/hooks/use-toast";

interface FlashMessages {
    success?: string
    error?: string
    info?: string
    warning?: string
}

export default function AppLayout({children}: { children: React.ReactNode }) {
    const {flash} = usePage().props as PageProps
    useEffect(() => {
        if (flash?.success) {
            toast({
                title: "Berhasil",
                description: flash.success,
                variant: "success",
            })
        }
        if (flash?.error) {
            toast({
                title: "Gagal",
                description: flash.error,
                variant: "destructive",
            })
        }
        if (flash?.info) {
            toast({
                title: "Info",
                description: flash.info,
            })
        }
        if (flash?.warning) {
            toast({
                title: "Peringatan",
                description: flash.warning,
                variant: "default",
            })
        }
    }, [flash])
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <SidebarProvider>
                <AppSidebar/>
                <main className="w-full overflow-x-hidden bg-zinc-50 dark:bg-zinc-800">
                    <div
                        className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-  [[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b bg-white dark:bg-zinc-950 fixed w-full top-0">
                        <AppNavbar/>
                    </div>
                    <div className='mt-[50px]'>{children}</div>
                    <Toaster/>
                </main>
            </SidebarProvider>
        </ThemeProvider>
    )
}
