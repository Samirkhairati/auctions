import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(reqest: Request) {
    try {
        const data = await reqest.json()
        console.log(data)
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}