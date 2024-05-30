
import prisma from '@/lib/prisma';
import session from '@/lib/session';
import { User } from 'next-auth';

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


export async function PUT(request: Request, { params }: { params: { id: string } }) {

    const token = (await request.json()).token
    // auth
    const user = (await session())?.user;
    if (!user) return Response.redirect("/api/auth/signin?next=/buy/" + params.id)
    const winner = await prisma.winner.findFirst({
        //@ts-ignore
        where: {
            itemId: params.id
        }
    })
    if (user.id !== winner?.userId) return Response.json({ error: "You are not the winner of this item" })
    if (token === winner?.token) {
        const updatedWinner = await prisma.winner.update({
            where: {
                id: winner?.id
            },
            data: {
                claimed: true
            },
        })
        return Response.json(updatedWinner)
    } else {
        return Response.json({ error: "Invalid token" })
    }
}