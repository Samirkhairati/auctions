
import prisma from '@/lib/prisma';
import session from '@/lib/session';
import { User } from 'next-auth';
import { pusherServer } from '@/lib/pusher';
import redis from '@/lib/redis';
import { cache } from 'react';


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

interface EventProps {
    image: string;
    name: string;
    amount: number;
    createdAt: Date;
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id

    const cachedItem = await redis.get(`item:${id}`)
    if (cachedItem) return Response.json(JSON.parse(cachedItem))

    const item = await prisma.item.findUnique({
        where: {
            id: id
        },
        include: {
            media: true,
            bids: {
                include: {
                    user: true
                }
            },
            user: true,
            winner: true
        }
    })
    await redis.set(`item:${id}`, JSON.stringify(item))
    return Response.json(item)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const body: PutProps = await request.json()
    // auth
    const user = (await session())?.user;
    if (!user) return Response.redirect("/api/auth/signin?next=/buy/" + params.id)

    //check for amount
    if (!body.amount) return Response.json({ error: "Enter a valid amount" })
    let amount = 0
    try { amount = Number(body.amount) }
    catch (error) { return Response.json({ error: "Enter a valid amount" }) }

    //validate amount
    if (amount < 0) return Response.json({ error: "Enter a valid amount" })
    const item = await prisma.item.findUnique({
        where: {
            id: body.itemId
        },
        include: {
            bids: true,
        }
    })

    if (!item?.active) return Response.json({ error: "Bidding period has closed" })

    //@ts-ignore
    if (item?.bids.length === 0 && amount <= item.basePrice) return Response.json({ error: "Your bid needs to be more than the base price!" })
    if (item?.bids.length != 0) {
        //@ts-ignore
        if (amount <= item.bids[item.bids.length - 1].amount) return Response.json({ error: "Your bid needs to be more than the highest bid!" })
    }


    const data: EventProps = {
        image: user.image as string,
        name: user.name as string,
        amount: amount,
        createdAt: new Date(),
    }
    await pusherServer.trigger(params.id, 'bids', data)

    const updatedItem = await prisma.item.update({
        where: {
            id: params.id
        },
        data: {
            bids: {
                //@ts-ignore
                create: {
                    amount: amount,
                    userId: user.id,
                }
            }
        },
        include: {
            bids: {
                include: {
                    user: true,
                },
            },

        },
    })
    await redis.del(`item:${params.id}`)
    return Response.json(updatedItem)
}