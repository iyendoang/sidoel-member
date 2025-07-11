import {useState} from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {buttonVariants} from "@/components/ui/button";
import {LogInIcon, Menu} from "lucide-react";
import {ModeToggle} from "@/components/landing-ui/mode-toggle";
import {Link, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {LogoIcon} from "@/components/landing-ui/icons";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "#features",
        label: "Features",
    },
    {
        href: "#testimonials",
        label: "Testimonials",
    },
    {
        href: "#pricing",
        label: "Pricing",
    },
    {
        href: "#faq",
        label: "FAQ",
    },
];

export const Navbar = () => {
    const {auth, appName} = usePage<PageProps>().props;
    const user = auth.user;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
                    <NavigationMenuItem className="font-bold flex">
                        <Link
                            rel="noreferrer noopener"
                            href={route("landing.index")}
                            className="ml-2 font-bold text-xl flex"
                        >
                            <LogoIcon/>
                            {appName}
                        </Link>
                    </NavigationMenuItem>

                    {/* mobile */}
                    <span className="flex md:hidden">
                        <ModeToggle/>
                        <Sheet
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                              <SheetTrigger className="px-2">
                                <Menu
                                    className="flex md:hidden h-5 w-5"
                                    onClick={() => setIsOpen(true)}
                                >
                                  <span className="sr-only">Menu Icon</span>
                                </Menu>
                              </SheetTrigger>

                              <SheetContent side={"left"}>
                                <SheetHeader>
                                  <SheetTitle className="font-bold text-xl">
                                    Shadcn/React
                                  </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                                  {routeList.map(({href, label}: RouteProps) => (
                                      <a
                                          rel="noreferrer noopener"
                                          key={label}
                                          href={href}
                                          onClick={() => setIsOpen(false)}
                                          className={buttonVariants({variant: "ghost"})}
                                      >
                                          {label}
                                      </a>
                                  ))}
                                    {user ? (
                                        <Link
                                            href={route('apps.dashboard')}
                                            as="button"
                                            className={`w-[110px] border ${buttonVariants({
                                                variant: "secondary",
                                            })}`}>
                                            {auth.user.name}
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className={`w-[110px] border ${buttonVariants({
                                                variant: "secondary",
                                            })}`}>
                                            <LogInIcon className="mr-2 w-5 h-5"/>
                                            Login
                                        </Link>
                                    )}
                                </nav>
                              </SheetContent>
                            </Sheet>
                     </span>
                    {/* desktop */}
                    <nav className="hidden md:flex gap-2">
                        {routeList.map((route: RouteProps, i) => (
                            <a
                                rel="noreferrer noopener"
                                href={route.href}
                                key={i}
                                className={`text-[17px] ${buttonVariants({
                                    variant: "ghost",
                                })}`}
                            >
                                {route.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex gap-2">
                        {user ? (
                            <Link
                                href={route('apps.dashboard')}
                                as="button"
                                className={buttonVariants({variant: "secondary"})}
                            >
                                {auth.user.name}
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className={buttonVariants({variant: "secondary"})}
                            >
                                <LogInIcon className="mr-2 w-5 h-5"/>
                                Login
                            </Link>
                        )}
                        <ModeToggle/>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};