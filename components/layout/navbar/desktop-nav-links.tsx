import Link from 'next/link'
import { ImSpades } from "react-icons/im";

function DesktopNavLinks() {
    return (
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
    )
}
function NavbarLink({ children, href }: { children: React.ReactNode, href: string }) {
    return (
        <Link prefetch={true} className="text-muted-foreground transition-colors hover:text-foreground" href={href}>
            {children}
        </Link>
    )
}

export default DesktopNavLinks