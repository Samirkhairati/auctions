import prisma from '@/lib/prisma';


export async function POST(request: Request) {

    const body = await request.json()
    const winner = await prisma.winner.findFirst({
        //@ts-ignore
        where: {
            itemId: body.itemId
        }
    })
    console.log(winner)
    return Response.json({token: winner?.token})
}
