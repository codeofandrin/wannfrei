import type { MetadataRoute } from "next"

import { getYearRange } from "@/utils/helpers"
import { cantons } from "@/utils/constants"

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [
        {
            url: "https://www.wannfrei.ch",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1
        },
        {
            url: "https://www.wannfrei.ch/legal",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5
        }
    ]

    getYearRange().forEach((year) => {
        entries.push({
            url: `https://www.wannfrei.ch/${year}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8
        })

        Object.keys(cantons).forEach((cantonID) => {
            entries.push({
                url: `https://www.wannfrei.ch/${year}/${cantonID}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.8
            })
        })
    })

    return entries
}
