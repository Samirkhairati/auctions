'use client'
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { CircleUserIcon, MenuIcon, Package2Icon, SearchIcon } from "@/components/layout/icons"
import SearchBar from "@/components/layout/search-bar"
import UserMenu from "@/components/layout/user-menu"
import { ImSpades } from "react-icons/im";
import ModeToggle from "@/components/layout/mode-toggle"
import Link from "next/link"


const Navbar = () => {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
                    <ImSpades className="h-6 w-6" />
                    <span className="font-bold text-xl">Auctions</span>
                </Link>
                <NavbarLink href="/">Buy</NavbarLink>
                <NavbarLink href="/sell">Sell</NavbarLink>
                <NavbarLink href="/chat">Chat</NavbarLink>
                <NavbarLink href="/settings">Settings</NavbarLink>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="shrink-0 md:hidden" size="icon" variant="outline">
                        <MenuIcon className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                            <ImSpades className="h-6 w-6" />
                            <span className="font-bold text-xl">Auctions</span>
                        </Link>
                        <MobileNavbarLink href="/">Buy</MobileNavbarLink>
                        <MobileNavbarLink href="/sell">Sell</MobileNavbarLink>
                        <MobileNavbarLink href="/chat">Chat</MobileNavbarLink>
                        <MobileNavbarLink href="/settings">Settings</MobileNavbarLink>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <SearchBar />
                <ModeToggle />
                <UserMenu />
            </div>
        </header>
    )
}

function NavbarLink({ children, href }: { children: React.ReactNode, href: string }) {
    return (
        <Link className="text-muted-foreground transition-colors hover:text-foreground" href={href}>
            {children}
        </Link>
    )
}

function MobileNavbarLink({ children, href }: { children: React.ReactNode, href: string }) {
    return (
        <Link className="text-muted-foreground hover:text-foreground" href={href}>
            {children}
        </Link>
    )
}

export default Navbar;