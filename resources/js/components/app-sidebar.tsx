import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar"
import { SideProfile } from "./side-menu/side-profile"
import Logo from '@/assets/logo.svg'
import { SideStat } from "./side-menu/side-stat"
import {Link, usePage} from "@inertiajs/react"
import { SideUserManagement } from "./side-menu/side-user-management"
import {LogoIcon} from "@/components/landing-ui/icons";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const { url } = usePage();
    const { appName } = usePage().props;
    const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
       <SidebarHeader className="border-b group-data-[collapsible=icon]:h-14 h-14 flex flex-row items-center justify-center dark:bg-gray-950 bg-white">
           <Link
               rel="noreferrer noopener"
               href={route("landing.index")}
               className="ml-2 font-bold text-xl flex"
           >
               <LogoIcon/>
               {appName}
           </Link>
        </SidebarHeader>
        <SidebarContent className="dark:bg-gray-950 scrollbar-hide bg-white">
            <SideStat url={url} setOpenMobile={setOpenMobile}/>
            <SideUserManagement url={url} setOpenMobile={setOpenMobile}/>
        </SidebarContent>
        <SidebarFooter className="border-t bg-white dark:bg-gray-950">
            <SideProfile/>
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
  )
}
