import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet";
import { Icons } from "@/components/icons";
import { appConfig } from "@/config/app";
import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/shadcn/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { mainMenu } from "@/config/menu";
import { ChevronDownIcon, ViewVerticalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Logo } from "../logo";
import { Accordion } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/shadcn/accordion";

export function Header() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
            <div className="container px-2 md:px-2 flex h-14 items-center justify-between">
                <div className="flex items-center space-x-4">
                    <NavLink to="/mapwork" className="flex items-center space-x-2">
                        <Logo />
                    </NavLink>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        {mainMenu.map((menu, index) =>
                            menu.items !== undefined ? (
                                <DropdownMenu key={index}>
                                    <DropdownMenuTrigger className={cn(
                                        "flex items-center py-1 focus:outline-none text-sm font-medium transition-colors hover:text-primary",
                                        (menu.items.filter(subitem => subitem.to !== undefined).map(subitem => subitem.to))
                                            .includes(location.pathname) ? 'text-foreground' : 'text-foreground/60',
                                    )}>
                                        {menu.title}
                                        <ChevronDownIcon className="ml-1 -mr-1 h-3 w-3 text-muted-foreground" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-48' align="start" forceMount>
                                        {menu.items.map((subitem, subindex) =>
                                            subitem.to !== undefined ? (
                                                <NavLink key={subindex} to={subitem.to}>
                                                    <DropdownMenuItem className={cn(
                                                        "hover:cursor-pointer",
                                                        { 'bg-muted': subitem.to === location.pathname }
                                                    )}>
                                                        {subitem.title}
                                                    </DropdownMenuItem>
                                                </NavLink>
                                            ) : (
                                                subitem.label ? (
                                                    <DropdownMenuLabel key={subindex}>{subitem.title}</DropdownMenuLabel>
                                                ) : (
                                                    <DropdownMenuSeparator key={subindex} />
                                                )
                                            )
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <NavLink
                                    key={index}
                                    to={menu.to ?? ""}
                                    className={({ isActive }) => cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        isActive ? "text-foreground" : "text-foreground/60"
                                    )}>
                                    {menu.title}
                                </NavLink>
                            )
                        )}
                    </nav>
                </div>

                {/* Mobile */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                            <ViewVerticalIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0 sm:max-w-xs">
                        <NavLink
                            to="/"
                            onClick={() => setOpen(false)}
                            className="flex items-center space-x-2">
                        </NavLink>
                        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-8">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                defaultValue={"item-" + mainMenu.findIndex(item =>
                                    item.items !== undefined
                                        ? item.items.filter(subitem => subitem.to !== undefined).map(subitem => subitem.to).includes(location.pathname)
                                        : false
                                )}>
                                <div className="flex flex-col space-y-3">
                                    {mainMenu.map((menu, index) =>
                                        menu.items !== undefined ? (
                                            <AccordionItem key={index} value={`item-${index}`} className="border-b-0 pr-6">
                                                <AccordionTrigger className={cn(
                                                    "py-1 hover:no-underline hover:text-primary [&[data-state=open]]:text-primary",
                                                    (menu.items.filter(subitem => subitem.to !== undefined).map(subitem => subitem.to))
                                                        .includes(location.pathname) ? 'text-foreground' : 'text-foreground/60',
                                                )}>
                                                    <div className="flex">{menu.title}</div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pb-1 pl-4">
                                                    <div className="mt-1">
                                                        {menu.items.map((submenu, subindex) => (
                                                            submenu.to !== undefined ? (
                                                                <NavLink
                                                                    key={subindex}
                                                                    to={submenu.to}
                                                                    onClick={() => setOpen(false)}
                                                                    className={({ isActive }) => cn(
                                                                        "block justify-start py-1 h-auto font-normal hover:text-primary",
                                                                        isActive ? 'text-foreground' : 'text-foreground/60',
                                                                    )}>
                                                                    {submenu.title}
                                                                </NavLink>
                                                            ) : (
                                                                submenu.label !== '' ? (
                                                                    null
                                                                ) : (
                                                                    <div className="px-3">
                                                                        {/* <Separator /> */}
                                                                    </div>
                                                                )
                                                            )
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ) : (
                                            <NavLink
                                                key={index}
                                                to={menu.to ?? ""}
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) => cn(
                                                    "py-1 text-sm font-medium transition-colors hover:text-primary",
                                                    isActive ? "text-foreground" : "text-foreground/60"
                                                )}>
                                                {menu.title}
                                            </NavLink>
                                        )
                                    )}
                                </div>
                            </Accordion>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>

                {/* Right Items */}
                <div className="flex items-center space-x-2">
                    <a
                        href={appConfig.github.url}
                        title={appConfig.github.title}
                        target="_blank"
                        rel="noreferrer">
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "w-9 px-0"
                            )}>
                            <Icons.gitHub className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </a>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                className='relative h-8 w-8 rounded-full'>
                                <Avatar className='h-8 w-8'>
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56' align='end' forceMount>
                            <DropdownMenuLabel className='font-normal'>
                                <div className='flex flex-col space-y-1'>
                                    <p className='text-sm font-medium leading-none'>shadcn</p>
                                    <p className='text-xs leading-none text-muted-foreground'>
                                        m@example.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
