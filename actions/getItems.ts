import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export default async function getItems() {
    try {
        const cachedItems = await redis.get("items")
        if (cachedItems) return JSON.parse(cachedItems)
        const items = await prisma.item.findMany({
            include: {
                media: true,
                bids: true,
                user: true,
                winner: true,
            }
        })
        await redis.set("items", JSON.stringify(items), "EX", 60 * 3 )
        return items
    } catch (error: any) {
        return ({error: error.message})
    }
}