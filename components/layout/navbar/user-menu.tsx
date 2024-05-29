'use client'

import { CircleUserIcon } from '@/components/layout/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from 'next-auth'
import Image from 'next/image';
import Link from 'next/link'
import { signOut } from "next-auth/react"

interface UserMenuProps {
    user: User;
}

const UserMenu = ({ user }: UserMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="secondary">
                    {user.image ?
                        <Image src={user.image} alt="username" width={24} height={24} className="rounded-full" />
                        :
                        <CircleUserIcon className="h-5 w-5" />
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/settings">
                    Settings
                </Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/about">
                    About
                </Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button onClick={() => signOut()}>
                        Logout
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu