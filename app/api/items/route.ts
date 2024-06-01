import prisma from '@/lib/prisma';
import session from '@/lib/session';
import redis from '@/lib/redis';

interface ItemFormData {
    name: string;
    description: string;
    price: number;
    date: Date;
    files: UploadedFile[];
}

interface UploadedFile {
    resource_type: string;
    secure_url: string;
}

export async function GET(request: Request) {
    try {
        const cachedItems = await redis.get("items")
        if (cachedItems) return Response.json(JSON.parse(cachedItems))

        const items = await prisma.item.findMany({
            include: {
                media: true,
                bids: true,
                user: true,
                winner: true,
            }
        })
        await redis.set("items", JSON.stringify(items))
        return Response.json(items)
    } catch (error) {
        return Response.json({})
    }
}

export async function POST(request: Request) {
    const body: ItemFormData = await request.json()
    const user = (await session())?.user;
    if (!user) return Response.redirect("/api/auth/signin?next=/sell")
    if (!body.name || !body.description || !body.price || !body.date || body.files.length === 0) {
        throw new Error("All fields are required")
    }
    const newItem = await prisma.item.create({
        //@ts-ignore
        data: {
            name: body.name,
            description: body.description,
            basePrice: body.price,
            endedAt: body.date,
            userId: user.id,
            media: {
                //@ts-ignore
                create: body.files.map(file => ({
                    resource_type: file.resource_type,
                    secure_url: file.secure_url,
                })),
            },
        },
    });
    await redis.del("items")
    return Response.json(newItem)
}