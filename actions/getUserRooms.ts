import prisma from '@/lib/prisma';

export default async function getUserRooms(userId: string) {
    try {
        const userRooms = await prisma.userRoom.findMany({
            where: {
                userId: userId,
            },
            include: {
                room: {
                    include: {
                        users: {
                            include: {
                                user: true,
                            },
                        },
                    },

                },
                user: true,
            },
        });

        return userRooms
    } catch (error: any) {
        return {error: error.message}
    }
}