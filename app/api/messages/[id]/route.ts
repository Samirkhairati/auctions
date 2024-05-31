import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const roomId = params.id;

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

        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
