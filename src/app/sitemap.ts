import type { MetadataRoute } from "next"

import { getSitemapYearRange, getSitemapIds } from "@/utils/helpers"
import { munics } from "@/utils/constants"

export async function generateSitemaps() {
    return getSitemapIds()
}

type ParamsType = { id: string }

export default function sitemap({ id }: ParamsType): MetadataRoute.Sitemap {
    const yearRange = getSitemapYearRange()
    const entries: MetadataRoute.Sitemap = []
    switch (id) {
        case "home":
            entries.push({
                url: "https://www.wannfrei.andrin.software",
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 1
            })
            yearRange.forEach((year) => {
                entries.push({
                    url: `https://www.wannfrei.andrin.software/${year}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.8
                })
            })
            break

        case "legal":
            entries.push({
                url: "https://www.wannfrei.andrin.software/legal",
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.5
            })
            break

        default:
            yearRange.forEach((year) => {
                entries.push({
                    url: `https://www.wannfrei.andrin.software/${year}/${id}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.8
                })

                for (const municID of Object.keys(munics[id as keyof typeof munics])) {
                    entries.push({
                        url: `https://www.wannfrei.andrin.software/${year}/${id}/${municID}`,
                        lastModified: new Date(),
                        changeFrequency: "weekly",
                        priority: 0.8
                    })
                }
            })
            break
    }

    return entries
}
