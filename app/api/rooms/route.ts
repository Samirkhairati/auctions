// import prisma from '@/lib/prisma';

// export async function POST(req: Request) {
//     const { name } = await req.json();
//     const newRoom = await prisma.room.create({
//         data: {
//             name,
//         },
//     });
//     return new Response(JSON.stringify(newRoom), { status: 201 });
// }