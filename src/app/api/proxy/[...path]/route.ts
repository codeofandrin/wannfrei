import { NextRequest, NextResponse } from "next/server"
import { URL } from "@/utils/constants"

const API_BASE = URL.apiBaseUrl

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params
    const apiPath = "/" + path.join("/")

    let body: string | null = null
    try {
        const json = await request.json()
        if (Object.keys(json).length > 0) body = JSON.stringify(json)
    } catch {}

    const res = await fetch(`${API_BASE}${apiPath}`, {
        method: "GET",
        headers: body ? { "Content-Type": "application/json" } : {},
        body: body ?? undefined
    })

    const text = await res.text()

    try {
        return NextResponse.json(JSON.parse(text), { status: res.status })
    } catch {
        return new NextResponse(text, { status: res.status })
    }
}
