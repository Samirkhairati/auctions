/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { User } from "next-auth"
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";


interface EventProps {
    image: string;
    name: string;
    amount: number;
    createdAt: Date;
}

export default function Bids({ id } : { id: string}) {

    const [item, setItem] = useState<EventProps[]>([])
    useEffect(() => {
        pusherClient.subscribe(id)
        pusherClient.bind('bids', function (data: EventProps) {
            setItem((prev) => [...prev, data])
        })
    }, [])


    return (
        <>
            {item?.map((bid, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Avatar className="w-4 h-4">
                                    <AvatarImage alt="Seller Avatar" src={bid.image || "/placeholder-user.jpg"} />
                                </Avatar>
                                <span className="font-medium">{bid.name || "Full Name"}</span>
                            </div>
                        </TableCell>
                        <TableCell>₹{bid.amount}</TableCell>
                        <TableCell>{bid.createdAt.toString().slice(0, 10)} ~ {bid.createdAt.toString().slice(11, 16)}</TableCell>
                    </TableRow>
                )
            })}
        </>
    )
}

