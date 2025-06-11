import {Users2, UserCog, UserRoundCheck, Users} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {Link} from "@inertiajs/react";
import hasAnyPermission from '@/utils/has-permissions'

export function SideUserManagement({url, setOpenMobile}: { url: string, setOpenMobile: any }) {
    return (
        <SidebarGroup>
            {(hasAnyPermission(['permissions-data']) || hasAnyPermission(['users-data']) || hasAnyPermission(['roles-data'])) && (
                <SidebarGroupLabel>Manajemen Pengguna</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
                <SidebarMenu>
                    {hasAnyPermission(['permissions-data']) &&
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={"Hak Akses"}
                                               isActive={url.startsWith('/apps/permissions') && true}>
                                <Link href={route('apps.permissions.index')} onClick={() => setOpenMobile(false)}>
                                    <UserRoundCheck/>
                                    <span>Hak Akses</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    }
                    {hasAnyPermission(['roles-data']) &&
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={"Akses Group"}
                                               isActive={url.startsWith('/apps/roles') && true}>
                                <Link href={route('apps.roles.index')} onClick={() => setOpenMobile(false)}>
                                    <UserCog/>
                                    <span>Akses Group</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    }
                    {hasAnyPermission(['users-data']) &&
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={"Pengguna"}
                                               isActive={url.startsWith('/apps/users') && true}>
                                <Link href={route('apps.users.index')} onClick={() => setOpenMobile(false)}>
                                    <Users/>
                                    <span>Pengguna</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    }
                </SidebarMenu>
            </SidebarGroupContent>
            {(hasAnyPermission(['lembagas-data']) || hasAnyPermission(['applications-data'])) && (
                <SidebarGroupLabel>Data Master</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
                <SidebarMenu>
                    {hasAnyPermission(['applications-data']) &&
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={"Aplikasi"}
                                               isActive={url.startsWith('/apps/applications') && true}>
                                <Link href={route('apps.applications.index')} onClick={() => setOpenMobile(false)}>
                                    <UserRoundCheck/>
                                    <span>Aplikasi</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    }
                    {hasAnyPermission(['lembagas-data']) &&
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={"Lembaga"}
                                               isActive={url.startsWith('/apps/lembagas') && true}>
                                <Link href={route('apps.lembagas.index')} onClick={() => setOpenMobile(false)}>
                                    <UserRoundCheck/>
                                    <span>Lembaga</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    }
                    {hasAnyPermission(['token-apps-data']) &&
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={"Token Aplikasi"}
                                               isActive={url.startsWith('/apps/token-apps') && true}>
                                <Link href={route('apps.token-apps.index')} onClick={() => setOpenMobile(false)}>
                                    <UserRoundCheck/>
                                    <span>Token Aplikasi</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    }
                    {hasAnyPermission(['token-apps-data']) &&
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={"Link Profile"}
                                               isActive={url.startsWith('/apps/link-profiles') && true}>
                                <Link href={route('apps.link-profiles.index')} onClick={() => setOpenMobile(false)}>
                                    <UserRoundCheck/>
                                    <span>Link Profile</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    }
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={"Posting"}
                                           isActive={url.startsWith('/post') && true}>
                            <Link href={route('forum.posts.index')} onClick={() => setOpenMobile(false)}>
                                <UserRoundCheck/>
                                <span>Posting</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
