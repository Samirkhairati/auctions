import prisma from '@/lib/prisma';
import session from '@/lib/session';
import { pusherServer } from '@/lib/pusher';
import redis from '@/lib/redis';

export async function POST(request: Request) {
    const { content, userId, roomId } = await request.json()
    const user = (await session())?.user;
    if (!user) return Response.redirect("/api/auth/signin?next=/sell")
    if (user.id !== userId) return Response.json({ message: "Unauthorized" })


    pusherServer.trigger(roomId, 'message', { content, userId, roomId, user: { name: user.name } })

    const newMessage = await prisma.message.create({
        data: {
            content,
            userId,
            roomId,
        },
    });
    return Response.json(newMessage)
}