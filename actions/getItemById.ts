import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export default async function getItemById(id: string) {

    const cachedItem = await redis.get(`item:${id}`)
    if (cachedItem) return JSON.parse(cachedItem)

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
    return item
}