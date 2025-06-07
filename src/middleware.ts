import { NextRequest, NextResponse } from "next/server"

import { holidayTypes } from "./utils/constants"

export const config = {
    matcher: "/:path*"
}

export default function middleware(req: NextRequest) {
    const url = req.nextUrl
    let changed = false

    url.searchParams.forEach((value, key) => {
        switch (key) {
            case "search":
                if (!value) {
                    url.searchParams.delete(key)
                    changed = true
                }
                break

            case "type":
                if (!(value in holidayTypes)) {
                    url.searchParams.delete(key)
                    changed = true
                }
                break

            case "weekday":
                const weekdayAsInt = parseInt(value)
                if (!(!isNaN(weekdayAsInt) && weekdayAsInt >= 0 && weekdayAsInt <= 6)) {
                    url.searchParams.delete(key)
                    changed = true
                }
                break

            default:
                url.searchParams.delete(key)
                changed = true
                break
        }
    })

    // Avoid infinite loop by only redirecting if the query
    // params were changed
    if (changed) {
        return NextResponse.redirect(url)
    }
}
