import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const roomId = params.id;
        const cachedItem = await redis.get(`messages:${roomId}`);
        if (cachedItem) return new Response(JSON.parse(cachedItem), { status: 200 });
        // Find all rooms where the user is a member
        const messages = await prisma.message.findMany({
            where: {
                roomId: roomId,
            },
            include: {
                room: true,
                user: true,
            },
        });
        await redis.set(`messages:${roomId}`, JSON.stringify(messages));
        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
