"use client"

import { FaHandHoldingUsd } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface OptionsProps {
    chat: string,
    details: string
}

export default function Contact({ chat, details }: OptionsProps) {

    //TODO: implement chat button

    const [bid, setBid] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleBid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData()
        data.append('amount', bid)
        data.append('itemId', details)
        setLoading(true)
        axios.put(`/api/items/${details}`, { amount: bid, itemId: details })
            .then(function (response) {
                if (response.data.error) {
                    toast.error(response.data.error)
                    setLoading(false)
                    return
                } else {
                    toast.success("Bid Placed successfully")
                }
                setLoading(false)

            })
            .catch(function (error) {
                toast.error("An error occured")
                setLoading(false)
            });

    }

    return (
        <>
            <div className="flex items-center gap-4 flex-wrap">
                <Link prefetch={true} href="/chat">
                    <Button className="w-full">
                        <IoChatboxOutline className="mr-2" />
                        Chat with Seller
                    </Button>
                </Link>
                <Button className="w-full">
                    <IoChatboxOutline className="mr-2" />
                    Chat with Seller
                </Button>
                <div className="flex items-center gap-2">
                    <form className="flex flex-wrap gap-2" onSubmit={handleBid}>
                        <Button disabled={loading} type="submit">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <FaHandHoldingUsd className="mr-2" />
                            Place Bid
                        </Button>
                        <Input onChange={(e) => setBid(e.target.value)} className="w-24" type="number" />
                    </form>
                </div>
            </div>
        </>
    );
}