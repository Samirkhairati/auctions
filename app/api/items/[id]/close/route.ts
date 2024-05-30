
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

interface PutProps {
    itemId: string;
    amount: string;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const item = await prisma.item.findUnique({
        where: {
            id: params.id
        },
        include: {
            user: true
        }
    })
    // auth
    const user = (await session())?.user;
    if (!user) return Response.redirect("/api/auth/signin?next=/buy/" + params.id)
    if (user.id !== item?.user?.id) return Response.json({ error: "You are not the owner of this item" })
    if (!item?.active) return Response.json({ error: "Item is already closed" })

    const updatedItem = await prisma.item.update({
        where: {
            id: params.id
        },
        data: {
            active: false,
            endedAt: new Date()
        },
        include: {
            bids: {
                include: {
                    user: true,
                },
            },
        },
    })
    return Response.json(updatedItem)
}