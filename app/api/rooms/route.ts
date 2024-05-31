import prisma from '@/lib/prisma';


export async function POST(req: Request) {
    try {
        const { userId1, userId2 } = await req.json();

        // Check if a private room already exists between these two users
        const existingRoom = await prisma.room.findFirst({
            where: {
                users: {
                    some: {
                        userId: userId1,
                    },
                },
                AND: {
                    users: {
                        some: {
                            userId: userId2,
                        },
                    },
                },
            },
        });

        if (existingRoom) {
            return new Response(JSON.stringify(existingRoom), { status: 200 });
        }

        // Create a new room if it doesn't exist
        const newRoom = await prisma.room.create({
            data: {
                users: {
                    create: [
                        { userId: userId1 },
                        { userId: userId2 },
                    ],
                },
            },
        });

        return new Response(JSON.stringify(newRoom), { status: 201 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}