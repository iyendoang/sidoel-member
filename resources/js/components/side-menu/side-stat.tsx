import { Monitor } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
export function SideStat({ url, setOpenMobile } : { url: string, setOpenMobile: any }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Stats</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={"Dashboard"} isActive={url === '/apps/dashboard' && true}>
                            <Link href={route('apps.dashboard')} onClick={() => setOpenMobile(false)}>
                                <Monitor/>
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
