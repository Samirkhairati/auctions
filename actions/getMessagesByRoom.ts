import prisma from '@/lib/prisma';

export default async function getMessagesByRoom(roomId: string) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                roomId: roomId,
            },
            include: {
                room: true,
                user: true,
            },
        });
        return messages
    } catch (error: any) {
        return { error: error.message }
    }
}