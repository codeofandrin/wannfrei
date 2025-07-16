import type { MetadataRoute } from "next"

import { getYearRange, getSitemapIds } from "@/utils/helpers"
import { munics } from "@/utils/constants"

export const revalidate = 86400 // every day

export async function generateSitemaps() {
    return getSitemapIds()
}

type ParamsType = { id: string }

export default function sitemap({ id }: ParamsType): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = []
    switch (id) {
        case "home":
            entries.push({
                url: "https://www.wannfrei.ch",
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 1
            })
            getYearRange().forEach((year) => {
                entries.push({
                    url: `https://www.wannfrei.ch/${year}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.8
                })
            })
            break

        case "legal":
            entries.push({
                url: "https://www.wannfrei.ch/legal",
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.5
            })
            break

        default:
            getYearRange().forEach((year) => {
                entries.push({
                    url: `https://www.wannfrei.ch/${year}/${id}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.8
                })

                for (const municID of Object.keys(munics[id as keyof typeof munics])) {
                    entries.push({
                        url: `https://www.wannfrei.ch/${year}/${id}/${municID}`,
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
