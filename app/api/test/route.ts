
export async function POST(req: Request) {
    const { text } = await req.json()

    return new Response(JSON.stringify({ success: true }))
}