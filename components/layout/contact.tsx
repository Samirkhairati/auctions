"use client"
import { FaHandshake } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import session from "@/lib/session";
import { IoQrCode } from "react-icons/io5";
import { path } from "@/lib/utils";
import { QRCodeSVG } from 'qrcode.react';
import { FaHandHoldingHeart } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { QrReader } from 'react-qr-reader';


interface OptionsProps {
    chat: string,
    details: string,
    buyer: string | undefined,
    seller: string | undefined,
    active: boolean
}

export default function Contact({ chat, details, buyer, seller, active }: OptionsProps) {

    //TODO: implement chat button


    const [bid, setBid] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [closing, setClosing] = useState<boolean>(false)
    const [generating, setGenerating] = useState<boolean>(false)
    const [qr, setQr] = useState<string>("")
    const [claim, setClaim] = useState<string>('');


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

    const handleClose = async () => {
        setClosing(true)
        axios.put(`/api/items/${details}/close`)
            .then(function (response) {
                if (response.data.error) {
                    toast.error(response.data.error)
                    setClosing(false)
                    return
                } else {
                    toast.success("Deal Closed successfully")
                }
                setClosing(false)

            })
            .catch(function (error) {
                toast.error("An error occured")
                setClosing(false)
            });
    }

    const handleGenerate = async () => {
        setGenerating(true)
        axios.post(`/api/items/${details}/generate`, { itemId: details })
            .then(function (response) {
                setQr(response.data.token)
                setGenerating(false)
            })
            .catch(function (error) {
                toast.error(JSON.stringify(error))
                setGenerating(false)
            });
    }

    return (
        <>
            <div className="flex items-center gap-4 flex-wrap">
                {(buyer !== seller) && <Link prefetch={true} href="/chat">
                    <Button className="w-full">
                        <IoChatboxOutline className="mr-2" />
                        Chat with Seller
                    </Button>
                </Link>}


                {(buyer === seller) && (active) && <Button disabled={closing} onClick={handleClose} className="" variant="destructive">
                    {closing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <FaHandshake className="mr-2" />
                    Close Deal
                </Button>}
                <Dialog>
                    <DialogTrigger asChild>
                        {(buyer === seller) && (!active) && <Button disabled={generating} onClick={handleGenerate} className="bg-emerald-600">
                            {generating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <IoQrCode className="mr-2" />
                            Generate QR
                        </Button>}
                    </DialogTrigger>
                    {!generating &&
                        <DialogContent className="w-auto">
                            <QRCodeSVG value={qr} />
                        </DialogContent>
                    }
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        {(buyer !== seller) && (!active) && <Button className="bg-emerald-600">
                            <FaHandHoldingHeart className="mr-2" />
                            Claim Item
                        </Button>}
                    </DialogTrigger>
                    {!generating &&
                        <DialogContent className="w-72 md:w-96">
                            <QrReader
                                onResult={(result, error) => {
                                    if (!!result) {
                                        //@ts-ignore
                                        setClaim(result?.text);
                                    }
                                    if (!!error) {
                                        console.info(error);
                                    }
                                }}
                                //@ts-ignore
                                style={{ width: '100%' }}
                            />
                        </DialogContent>
                    }
                </Dialog>

                {(buyer !== seller) && (active) && <div className="flex items-center gap-2">
                    <form className="flex flex-wrap gap-2" onSubmit={handleBid}>
                        <Button disabled={loading} type="submit">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <FaHandHoldingUsd className="mr-2" />
                            Place Bid
                        </Button>
                        <Input onChange={(e) => setBid(e.target.value)} className="w-24" type="number" />
                    </form>
                </div>}
            </div>
        </>
    );
}

