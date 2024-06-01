import { IoChatboxOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface OptionsProps {
    chat: string,
    details: string
}

export default function Options({ chat, details }: OptionsProps) {


    return (
        <>
            {/* <Link prefetch={true} href="/chat">
                <Button className="flex items-center" size="sm" variant="outline">
                    <IoChatboxOutline className="mr-2" />
                    Chat
                </Button>
            </Link> */}
            <Link prefetch={true} href={`/buy/${details}`}>
                <Button className="dark:text-white" size="sm" variant="outline">
                    <TbListDetails className="mr-2" />
                    Details
                </Button>
            </Link>


        </>
    );
}