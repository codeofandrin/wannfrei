import { NextRequest, NextResponse } from "next/server"

const VALID_PARAMS = ["canton", "year"]

const VALID_CANTON_IDS = [
    "AG",
    "AR",
    "AI",
    "BL",
    "BS",
    "BE",
    "FR",
    "GE",
    "GL",
    "GR",
    "JU",
    "LU",
    "NE",
    "NW",
    "OW",
    "SH",
    "SZ",
    "SO",
    "SG",
    "TI",
    "TG",
    "UR",
    "VD",
    "VS",
    "ZG",
    "ZH"
]

export const config = {
    matcher: "/"
}

export default function middleware(req: NextRequest) {
    const url = req.nextUrl
    let changed = false

    url.searchParams.forEach((value, key) => {
        switch (key) {
            case "canton":
                const valueUpper = value.toUpperCase()
                if (VALID_CANTON_IDS.includes(valueUpper)) {
                    if (valueUpper !== value) {
                        // value is not uppercase, make it uppercase to have it consistent
                        url.searchParams.set(key, valueUpper)
                        changed = true
                    }
                } else {
                    url.searchParams.delete(key)
                    changed = true
                }
                break

            case "year":
                const currentYear = new Date().getFullYear()
                const valueAsInt = parseInt(value)

                // check if value is a valid integer and if the year is in the range -5 to +20 from now
                if (!(valueAsInt && valueAsInt >= currentYear - 5 && valueAsInt <= currentYear + 20)) {
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
