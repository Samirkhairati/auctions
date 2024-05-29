import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import {MenuIcon } from "@/components/layout/icons"
import SearchBar from "@/components/layout/navbar/search-bar"
import UserMenu from "@/components/layout/navbar/user-menu"
import ModeToggle from "@/components/layout/navbar/mode-toggle"
import MobileNavLinks from "@/components/layout/navbar/mobile-nav-links"
import DesktopNavLinks from "@/components/layout/navbar/desktop-nav-links"
import session from "@/lib/session";
import SignInButton from "./navbar/sign-in-button"

export default async function Navbar() {

    const user = (await session())?.user;
    console.log(user)

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <DesktopNavLinks />
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="shrink-0 md:hidden" size="icon" variant="outline">
                        <MenuIcon className="h-5 w-5" />
                    </Button>


                </SheetTrigger>
                <SheetContent side="left">
                    <MobileNavLinks />
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <SearchBar />
                <ModeToggle />
                {user ?
                    <UserMenu user={user} />
                    :
                    <SignInButton />
                }

            </div>
        </header>
    )
}
