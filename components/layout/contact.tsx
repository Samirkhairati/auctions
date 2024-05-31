/* eslint-disable react-hooks/exhaustive-deps */
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
import { FaCamera } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Scanner } from '@yudiel/react-qr-scanner';

interface OptionsProps {
    chat: string,
    details: string,
    buyer: string | undefined,
    seller: string | undefined,
    active: boolean,
    claimed: boolean
}

export default function Contact({ chat, details, buyer, seller, active, claimed }: OptionsProps) {

    //TODO: implement chat button


    const [bid, setBid] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [closing, setClosing] = useState<boolean>(false)
    const [generating, setGenerating] = useState<boolean>(false)
    const [qr, setQr] = useState<string>("")
    const [claim, setClaim] = useState<any>();
    const [claiming, setClaiming] = useState<boolean>(false);


    const handleBid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData()
        data.append('amount', bid)
        data.append('itemId', details)
        setLoading(true)
        await axios.put(`/api/items/${details}`, { amount: bid, itemId: details })
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
        await axios.put(`/api/items/${details}/close`)
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
        await axios.post(`/api/items/${details}/generate`, { itemId: details })
            .then(function (response) {
                setQr(response.data.token)
                setGenerating(false)
            })
            .catch(function (error) {
                toast.error(JSON.stringify(error))
                setGenerating(false)
            });
    }


    const handleClaim = async (token: string) => {
        setClaiming(true)
        await axios.put(`/api/items/${details}/claim`, { token: token })
            .then(function (response) {
                setClaiming(false)
                if (response.data.error) {
                    toast.error(response.data.error)
                    window.location.reload()
                } else {
                    toast.success("Item claimed successfully")
                    window.location.reload()
                }
            })
            .catch(function (error: any) {
                toast.error("An error occurred: " + JSON.stringify(error))
                setClaiming(false)
            });
    }

    useEffect(() => {
        if (claim) handleClaim(claim[0].rawValue)
    }, [claim])


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
                        {(buyer !== seller) && (!active) && (!claimed) && <Button disabled={claiming} className="bg-emerald-600">
                            {claiming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <FaCamera className="mr-2" />
                            Claim Item
                        </Button>}
                    </DialogTrigger>
                    {!claiming &&
                        <DialogContent className="h-80">
                            <Scanner paused={false} onScan={(result: any) => setClaim(result)} />
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

