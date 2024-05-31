import Link from 'next/link'
import React from 'react'
import { ImSpades } from "react-icons/im";


function MobileNavLinks() {
    return (
        <nav className="grid gap-6 text-lg font-medium">
            <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                <ImSpades className="h-6 w-6" />
                <span className="font-bold text-xl">Auctions</span>
            </Link>
            <MobileNavbarLink href="/">Buy</MobileNavbarLink>
            <MobileNavbarLink href="/sell">Sell</MobileNavbarLink>
            <MobileNavbarLink href="/chat">Chat</MobileNavbarLink>
        </nav>
    )
}
function MobileNavbarLink({ children, href }: { children: React.ReactNode, href: string }) {
    return (
        <Link className="text-muted-foreground hover:text-foreground" href={href}>
            {children}
        </Link>
    )
}
export default MobileNavLinks