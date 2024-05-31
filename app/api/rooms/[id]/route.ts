import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = params.id;

        // Find all rooms where the user is a member
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

        return new Response(JSON.stringify(userRooms), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
