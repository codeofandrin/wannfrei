import { NextRequest, NextResponse } from "next/server"
import https from "https"

const API_HOST = "api.wannfrei.andrin.software"

function httpsRequest(path: string, body: string | null): Promise<{ status: number; data: string }> {
    return new Promise((resolve, reject) => {
        const options: https.RequestOptions = {
            hostname: API_HOST,
            path,
            method: "GET",
            headers: body
                ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }
                : {}
        }

        const req = https.request(options, (res) => {
            let data = ""
            res.on("data", (chunk) => (data += chunk))
            res.on("end", () => resolve({ status: res.statusCode ?? 500, data }))
        })

        req.on("error", reject)
        if (body) req.write(body)
        req.end()
    })
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params
    const apiPath = "/" + path.join("/")

    let body: string | null = null
    try {
        const json = await request.json()
        if (Object.keys(json).length > 0) body = JSON.stringify(json)
    } catch {}

    const { status, data } = await httpsRequest(apiPath, body)

    try {
        return NextResponse.json(JSON.parse(data), { status })
    } catch {
        return new NextResponse(data, { status })
    }
}
