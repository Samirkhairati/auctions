import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export async function POST(request: Request) {

    const body = await request.json()
    const winner = await prisma.winner.findFirst({
        //@ts-ignore
        where: {
            itemId: body.itemId
        }
    })
    await redis.del(`item:${body.itemId}`)
    return Response.json({token: winner?.token})
}
