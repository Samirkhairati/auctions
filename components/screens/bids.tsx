/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { User } from "next-auth"
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

interface Item {
    id: string;
    name?: string;
    description?: string;
    basePrice?: number;
    active: boolean;
    endedAt?: Date;
    userId: string;
    user: User;
    media: Media[];
    winner: Winner
    bids: Bid[];
    createdAt: Date;
    updatedAt: Date;
}

interface Media {
    id: string;
    resource_type: string;
    secure_url: string;
    itemId: string;
    item: Item;
}

interface Bid {
    id: string;
    amount: number;
    itemId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    item: Item;
    user: User;
}

interface Winner {
    id: string;
    claimed: boolean;
    itemId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    item: Item;
    user: User;
}

interface EventProps {
    image: string;
    name: string;
    amount: number;
    createdAt: Date;
}

export default function Bids({ initialItem, id }: { initialItem: Item }) {

    const [item, setItem] = useState<Item>(initialItem)
    useEffect(() => {
        pusherClient.subscribe('global')
        pusherClient.bind('bids', function (data: EventProps) {
            alert(data)
        })
    }, [])


    return (
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Bid</TableHead>
                        <TableHead>Date/Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {item?.bids?.slice().reverse().map((bid, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-4 h-4">
                                            <AvatarImage alt="Seller Avatar" src={bid.user.image || "/placeholder-user.jpg"} />
                                        </Avatar>
                                        <span className="font-medium">{bid.user.name || "Full Name"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>₹{bid.amount}</TableCell>
                                <TableCell>{bid.createdAt.toString().slice(0, 10)} ~ {bid.createdAt.toString().slice(11, 16)}</TableCell>
                            </TableRow>
                        )
                    })}
                    <TableRow>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Avatar className="w-4 h-4">
                                    <AvatarImage alt="Seller Avatar" src={item?.user?.image || "/placeholder-user.jpg"} />
                                    <AvatarFallback>JS</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{item?.user.name || "Full Name"}</span>
                            </div>
                        </TableCell>
                        <TableCell>₹{item?.basePrice}</TableCell>
                        <TableCell>{item?.createdAt.toString().slice(0, 10)} ~ {item?.createdAt.toString().slice(11, 16)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

