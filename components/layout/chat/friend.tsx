import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function Friend() {
    return (
        <Link
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 dark:bg-gray-800"
            href="#"
        >
            <Avatar className="border w-10 h-10">
                <AvatarImage alt="Image" src="/placeholder-user.jpg" />
                <AvatarFallback>O</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
            </div>
        </Link>
    )
}