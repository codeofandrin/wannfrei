import { getSitemapIds } from "@/utils/helpers"

export const revalidate = 3600 // every 1h

export async function GET() {
    const idObjects = getSitemapIds()

    const sitemaps = []
    for (const idObj of idObjects) {
        sitemaps.push(`
            <sitemap>
                <loc>https://www.wannfrei.ch/sitemap/${idObj.id}.xml</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </sitemap>`)
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps}
    </sitemapindex>`

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml"
        }
    })
}
