import { IoChatboxOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Options() {
    return (
        <>
            <Link href="/chat">
                <Button className="flex items-center" size="sm" variant="outline">
                    <IoChatboxOutline className="mr-2" />
                    Chat
                </Button>
            </Link>
            <Link href="/details">
                <Button size="sm" variant="outline">
                    <TbListDetails className="mr-2" />
                    Details
                </Button>
            </Link>


        </>
    );
}