import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request) {
    const { text } = await req.json()
    pusherServer.trigger('y123', 'event', text)

    return new Response(JSON.stringify({ success: true }))
}